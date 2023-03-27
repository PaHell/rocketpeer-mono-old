use nom::{
    bytes::complete::{tag, take_until, take_while, take_while1},
    combinator::complete,
    multi::many0,
    sequence::tuple,
    IResult,
};
use std::fs;

#[derive(Debug)]
struct Model {
    name: String,
    properties: Vec<Property>,
}

#[derive(Debug)]
struct Property {
    name: String,
    data_type: String,
}

#[derive(Debug)]
struct Enum {
    name: String,
    entries: Vec<String>,
}

fn parse_model(input: &str) -> IResult<&str, Model> {
    let (input, (_, name, _, properties)) = tuple((
        tag("model"),
        take_until("{"),
        tag("{"),
        many0(parse_property),
    ))(input)?;

    let output = Model {
        name: name.to_owned(),
        properties,
    };

    Ok((input, output))
}

fn parse_property(input: &str) -> IResult<&str, Property> {
    if input.contains("@") {
        let (input, (_, name, _, data_type, _, _)) = tuple((
            take_while(char::is_whitespace),           // _
            take_while1(|c: char| !c.is_whitespace()), // name
            take_while(char::is_whitespace),           //_
            take_while1(|c: char| !c.is_whitespace()), // data type
            take_while(char::is_whitespace),           //_
            complete(take_until("\n")),                // @ stuff
        ))(input)?;

        let data = match data_type {
            "Int" => "number",
            "String" => "string",
            "Bytes" => "Blob",
            "DateTime" => "string",
            _ => data_type,
        };

        let output = Property {
            name: name.to_owned(),
            data_type: data.to_owned(),
        };
        return Ok((input, output));
    } else {
        let (input, (_, name, _, data_type)) = tuple((
            take_while(char::is_whitespace),           // _
            take_while1(|c: char| !c.is_whitespace()), // name
            take_while(char::is_whitespace),           //_
            complete(take_until("\n")),                //data type
        ))(input)?;
        let data = match data_type {
            "Int" => "number",
            "String" => "string",
            "Bytes" => "Blob",
            _ => data_type,
        };
        let output = Property {
            name: name.to_owned(),
            data_type: data.to_owned(),
        };
        return Ok((input, output));
    }
}

fn filter_properties(properties: &Vec<Property>) -> Vec<Property> {
    properties
        .iter()
        .map(|property| Property {
            name: property.name.to_owned(),
            data_type: property
                .data_type
                .split("@")
                .next()
                .expect("property data type is missing")
                .to_owned(),
        })
        .collect()
}

fn generate_ts_interfaces(models: &Vec<Model>, enums: &Vec<Enum>) -> String {
    let mut output = String::new();

    for model in models {
        output.push_str(&format!("export interface{}{{\n", model.name));
        for (i, property) in filter_properties(&model.properties).iter().enumerate() {
            if property.name.contains("@@") {
                continue;
            }
            if property.data_type.contains("?") {
                let new_type: String = property.data_type.chars().filter(|&c| c != '?').collect();

                output.push_str(&format!("    {}: {};\n", property.name, new_type));
            } else {
                output.push_str(&format!("    {}: {};\n", property.name, property.data_type));
            }
        }
        output.push_str("\n}\n\n");
    }
    for x in enums {
        output.push_str(&format!("export enum{}{{\n", x.name));
        for entry in &x.entries {
            output.push_str(&format!("    {},\n", &entry))
        }

        output.push_str("}\n")
    }
    output
}

fn parse_enum(input: &str) -> IResult<&str, Enum> {
    let (input, (_, name, _, properties)) = tuple((
        tag("enum"),
        take_until("{"),
        tag("{"),
        many0(parse_enum_entries),
    ))(input)?;

    let output = Enum {
        name: name.to_owned(),
        entries: properties,
    };
    Ok((input, output))
}

fn parse_enum_entries(input: &str) -> IResult<&str, String> {
    let (input, (_, mut entry_data, _)) = tuple((
        take_while(char::is_whitespace),           // _
        take_while1(|c: char| !c.is_whitespace()), // name
        complete(take_until("\n")),                // @ stuff
    ))(input)?;
    if entry_data == "}" {
        entry_data = "";
    }

    Ok((input, entry_data.to_owned()))
}
fn main() {
    let input = fs::read_to_string("rust/prisma/schema.prisma").expect("Failed to read schema");
    let mut data: Vec<String> = input.split("}\n\n").map(|s| s.to_string()).collect();
    data.drain(0..2);
    let mut models: Vec<Model> = Vec::new();
    let mut enums: Vec<Enum> = Vec::new();
    for model in data {
        if model.contains("model") {
            let (_, output) = parse_model(&model).expect("failed to parse schema");
            models.push(output);
        } else if model.contains("enum") {
            let (_, my_enum) = parse_enum(&model).expect("failed to parse enum");
            enums.push(my_enum);
        }
    }

    let mut output = generate_ts_interfaces(&models, &enums);

    fs::write("sveltekit/src/database.d.ts", output).expect("failed to write ts file");
}
