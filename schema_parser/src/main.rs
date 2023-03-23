use std::fs;

fn main() {
    let schema_contents =
        fs::read_to_string("../../rust/prisma/schema.prisma").expect("Failed to read file");

    let lines: Vec<&str> = schema_contents.split("\n").collect();
    let mut models = Vec::new();
    let mut in_model = false;

    for line in lines {
        if line.contains("{") {
            in_model = true;
            models.push(line);
            continue;
        }

        if line.contains("}") {
            in_model = false;
            models.push(line);
            continue;
        }

        if in_model {
            models.push(line);
        }
    }
    let mut models_without_relations: Vec<String> = Vec::new();
    models.drain(0..8);
    for line in models {
        if line.contains("@relation") || line.contains("@@index") {
        } else if line.contains("model") {
            let new_line = line.replace("model", "interface");
            models_without_relations.push(new_line);
        } else if line.contains("String") {
            let new_line = line.replace("String", ": string;");
            models_without_relations.push(new_line);
        } else if line.contains("@default") {
            let new_line = line.replace("@default(now())", "");
            models_without_relations.push(new_line);
        } else {
            models_without_relations.push(line.to_string());
        }
    }

    fs::write("testfile.txt", models_without_relations.join("\n"))
        .expect("failed to write to file");
}
