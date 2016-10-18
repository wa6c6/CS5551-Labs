package cs5551.servicea;

import static org.junit.Assert.*;

import org.junit.Test;

public class ConsonantTest
{

	@Test
	public void test_null()
	{
		int count = Consonant.count(null);
		assertEquals(0, count);
	}

	@Test
	public void test_empty()
	{
		int count = Consonant.count("");
		assertEquals(0, count);
	}

	@Test
	public void test_upper()
	{
		int count = Consonant.count("WAYNE");
		assertEquals(3, count);
	}

	@Test
	public void test_lower()
	{
		int count = Consonant.count("wayne");
		assertEquals(3, count);
	}

	@Test
	public void test_mixed()
	{
		int count = Consonant.count("wAyNe");
		assertEquals(3, count);
	}
}
