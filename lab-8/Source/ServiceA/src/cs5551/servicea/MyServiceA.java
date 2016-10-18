package cs5551.servicea;

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
@Path("/myservicea")
public class MyServiceA 
{
	@Path("{c}")
	@GET
	@Produces("application/json")
	public Response consonant(@PathParam("c") String str) throws JSONException 
	{
		System.out.println("in consonant()");

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("consonantCount", Consonant.count(str)); 

		return Response.status(200).entity(jsonObject.toString()).build();
	}
}