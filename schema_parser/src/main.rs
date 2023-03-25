use std::{env, fs};

use nom::{
    bytes::complete::{tag, take_until, take_while},
    combinator::complete,
    multi::{many0, many1},
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
    println!("{}", input);
    let (input, (_, name, _, properties, _)) = tuple((
        complete(tag("model ")),
        complete(take_until("{")),
        complete(tag(" { ")),
        many1(complete(parse_property)),
        complete(tag(" } ")),
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
    println!("parse property {}", input);
    let (input, (name, _, data_type, _)) = tuple((
        complete(take_while(|c: char| c.is_alphanumeric())),
        complete(tag(": ")),
        complete(take_while(|c: char| c.is_alphanumeric())),
        complete(tuple((tag("@"), take_while(|c: char| c.is_alphanumeric())))),
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
    many0(complete(parse_model))(input)
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
