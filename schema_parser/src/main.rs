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

fn generate_ts_interfaces(models: &Vec<Model>) -> String {
    let mut output = String::new();

    for model in models {
        output.push_str(&format!("interface{}{{\n", model.name));
        for (i, property) in filter_properties(&model.properties).iter().enumerate() {
            output.push_str(&format!("    {}: {};", property.name, property.data_type));
            if i < model.properties.len() - 1 {
                output.push_str("\n");
            } else {
                output.push_str("\n}\n\n");
            }
        }
    }
    output
}
fn main() {
    let input = fs::read_to_string("schema.prisma").expect("Failed to read schema");
    let mut data: Vec<String> = input.split("}\n\n").map(|s| s.to_string()).collect();
    data.drain(0..2);
    let mut models: Vec<Model> = Vec::new();
    for mut model in data {
        //let mut tester: String = model.lines().filter(|line| !line.contains("@@")).collect();
        //tester.push_str("}");
        let (_, output) = parse_model(&model).expect("failed to parse schema");
        models.push(output);
    }

    let output = generate_ts_interfaces(&models);

    fs::write("schema.d.ts", output).expect("failed to write ts file");
}
