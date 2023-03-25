use std::{env, fs};

use nom::{
    bytes::complete::{tag, take_while},
    multi::many0,
    sequence::tuple,
    IResult,
};

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
    println!("parsing model");
    let (input, (_, name, _, properties, _)) = tuple((
        tag("model "),
        take_while(|c: char| c.is_alphanumeric()),
        tag(" { "),
        many0(parse_property),
        tag(" } "),
    ))(input)?;

    println!("parse_model {}", input);
    Ok((
        input,
        Model {
            name: name.to_owned(),
            properties,
        },
    ))
}

fn parse_property(input: &str) -> IResult<&str, Property> {
    let (input, (name, _, data_type, _)) = tuple((
        take_while(|c: char| c.is_alphanumeric()),
        tag(": "),
        take_while(|c: char| c.is_alphanumeric()),
        tag("@"),
    ))(input)?;

    Ok((
        input,
        Property {
            name: name.to_owned(),
            data_type: data_type.to_owned(),
        },
    ))
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
    many0(parse_model)(input)
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

    println!("models {:?}", models);
    let output = generate_ts_interfaces(&models);

    println!("{:?}", output);
    fs::write("schema.d.ts", output).expect("failed to write ts file");
}
