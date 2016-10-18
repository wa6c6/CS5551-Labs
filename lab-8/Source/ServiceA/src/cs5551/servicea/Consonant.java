package cs5551.servicea;

/**
 * Handles Consonants in the English language.
 * 
 * @author WA4101
 */
public class Consonant
{
	private Consonant(){}
	
	/**
	 * Counts the number of consonants in a word.
	 * 
	 * @param word The whose consonants will be counted.
	 * @return The number of consonants in the word.
	 */
	public static int count(String word)
	{
		if(word == null || word.length() ==0 )
		{
			return 0;
		}
		
		int count = 0;
		
		String lower = word.toLowerCase();
		
		for(int i=0; i < lower.length(); i++)
		{
			switch(lower.charAt(i))
			{
			case 'b':
			case 'c':
			case 'd':
			case 'f':
			case 'g':
			case 'h':
			case 'j':
			case 'k':
			case 'l':
			case 'm':
			case 'n':
			case 'p':
			case 'q':
			case 'r':
			case 's':
			case 't':
			case 'v':
			case 'w':
			case 'x':
			case 'y':
			case 'z':
				count++;
			default:			
			}
		}
		
		return count;
	}
}
