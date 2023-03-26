use nom::{
    bytes::complete::{tag, take_until, take_while, take_while1},
    combinator::complete,
    multi::{many0, many1},
    sequence::tuple,
    IResult,
};
use std::{env, fs};

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

fn parse_model(input: &str) -> IResult<&str, Model> {
    let (input, (_, name, _, properties, _)) = tuple((
        tag("model"),
        take_until("{"),
        tag("{"),
        many1(parse_property),
        tag("\n}\n"),
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
            _ => data_type,
        };

        println!("{}: {:?}", name, data);
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
        println!("{}: {:?}", name, data);
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

fn parse_schema(input: &str) -> IResult<&str, Vec<Model>> {
    many1(parse_model)(input)
}

fn generate_ts_interfaces(models: &Vec<Model>) -> String {
    let mut output = String::new();

    for model in models {
        output.push_str(&format!("interface {} {{\n", model.name));
        for property in filter_properties(&model.properties) {
            output.push_str(&format!("    {}: {};\n", property.name, property.data_type))
        }
        output.push_str("}\n\n");
    }
    output
}

fn main() {
    let input = fs::read_to_string("schema.prisma").expect("Failed to read schema");

    let (_, models) = parse_schema(&input).expect("failed to parse schema");

    let output = generate_ts_interfaces(&models);

    fs::write("schema.d.ts", output).expect("failed to write ts file");
}
