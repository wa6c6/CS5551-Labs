package cs5551.serviceb;

/**
 * Handles Consonants in the English language.
 * 
 * @author WA4101
 */
public class Vowel
{
	private Vowel(){}
	
	/**
	 * Counts the number of vowels in a word.
	 * 
	 * @param word The whose vowels will be counted.
	 * @return The number of vowels in the word.
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
			case 'a':
			case 'e':
			case 'i':
			case 'o':
			case 'u':
				count++;
			default:			
			}
		}
		
		return count;
	}
}
