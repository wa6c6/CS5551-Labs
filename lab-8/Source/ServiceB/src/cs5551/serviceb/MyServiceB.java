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
public class MyServiceB 
{
	@Path("{c}")
	@GET
	@Produces("application/json")
	public Response vowel(@PathParam("c") String str) throws JSONException 
	{
		System.out.println("in vowel()");
		
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("vowelCount", Vowel.count(str)); 

		return Response.status(200).entity(jsonObject.toString()).build();
	}
}