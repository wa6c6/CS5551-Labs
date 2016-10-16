package cs5551.serviceb;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;
 
/**
 * @author Wayne Aulner (#2)
 *
 */
@Path("/myserviceb")
public class MyServiceB {
	@GET
	@Produces("application/json")
	public Response hello() throws JSONException {
 
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("value", "World!"); 

		return Response.status(200).entity(jsonObject.toString()).build();
	}
 
	@Path("{c}")
	@GET
	@Produces("application/json")
	public Response boomerang(@PathParam("c") String str) throws JSONException {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("value", str); 

		return Response.status(200).entity(jsonObject.toString()).build();
	}
}