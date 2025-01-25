package pl.amerevent.amer.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

public class CustomDeserializer extends JsonDeserializer<String> {
	@Override
	public String deserialize(JsonParser jsonParser, DeserializationContext context) throws IOException, JsonProcessingException {
		JsonNode node = jsonParser.readValueAsTree();
		if (node.asText().isEmpty()) {
			return null;
		}
		return node.toString();
	}
}
