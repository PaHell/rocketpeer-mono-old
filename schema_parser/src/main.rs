use std::{fs, io::Write};

use pest::{iterators::Pair, Parser};
use pest_derive::Parser;

#[derive(Parser)]
#[grammar = "prisma.pest"]
struct PrismaParser;

#[derive(Debug, Default)]
struct PrismaSchema {
    models: Vec<Model>
}

#[derive(Debug, Default)]
struct Model {
    name: String,
    fields: Vec<Field>,
    id_fields: Option<IdField>
}

impl Model {
    fn field_names(&self) -> Vec<&str> {
        self.fields.iter().map(|f| f.name.as_str()).collect()
    }
}

#[derive(Debug, Default)]
struct Field {
    name: String,
    field_type: FieldType
}

impl Field {
    fn new_relation(name:String, related_model: String) -> Field {
        let field_type = FieldType::Relation(Box::new(Field {
            name:related_model.clone(),
            field_type: FieldType::Enum(related_model)
        }));
        Field {name, field_type}
    }
}

#[derive(Debug)]
enum FieldType {
    Boolean,
    Int,
    Float,
    String,
    Enum(String),
    Relation(Box<Field>)
}

impl Default for FieldType {
    fn default() -> Self {
        FieldType::String
    }
}

#[derive(Debug, Default)]
struct IdField {
    name: String,
    fields: Vec<String>
}

fn main() {
    let schema_file = fs::read_to_string("../../rust/prisma/schema.prisma").expect("failed to load schema file");
    let schema_ast = parse_prisma_schema(&schema_file);
    let ts_code = generate_typescript_interfaces(&schema_ast);

    fn parse_prisma_schema(schema: &str) -> PrismaSchema {
        let mut schema_ast = PrismaSchema::default();

        let pairs = PrismaParser::parse(Rule::schema, schema)
            .unwrap_or_else(|e| panic!("{}", e))
            .next()
            .unwrap()
            .into_inner();

        for pair in pairs {
            match pair.as_rule() {}
        }
    }
}
