/*
 * Author: Marco Carlo Cavalazzi.
 * Released under the GNU GPL License.
 * 
 * This JS library is intended to read the web articles to show in a webpage from a XML file organized as:
 * <article>
 *  <title>This is a title</title>
 *  <type>icon fa-laptop</type>
 *  <text>This is an example of content.</text>
 * </article>
 * 
 * Once read the article will be checked and, if the number of words contained is higher than the parameter passed in input than the rest of the article will be hidden and an ellipsis will be put at its place.
 * This is done to avoid having very long articles displayed in a webpage were we want to show only a preview of each article.
 * 
 * Input parameters:
 * - the name of the XML file from which we read the articles
 * - the maximum number of words to display for each article
 * - the CSS ID name that will be applied to the HTML sections while adding the text to the webpage (this is useful for design purposes).
 */

// Global varialbes
articles = "";  // The varialbe containing the many articles that we want to display.
xmlSourceFile = "../database/articles.xml";
maxWords = 90;
sectionID = "";         // no preset ID

// This function starts automatically as soon as the page is loaded.
$( document ).ready(function() {
    console.log( "articlesPreview.js ready!" );
    
    /* Reading the articles */
    var articles = normalizeMyArticles( xmlSourceFile, maxWords );
    console.log( "Articles read." );
        
    /* Displaying the articles on the webpage */
    displayMyArticles( maxWords, sectionID );
    console.log( "Articles displayed." );
});


function normalizeMyArticles( xmlSourceFile, numWords, sectionID ){
    maxWords = numWords;    // in case the function is called from outside we want to update the stored global variable to have a consistent behaviour in the displayMyArticles() function.
    // can we set up the website on github to download only the main files and later make an ajax call for xml file (or any other document) from the server only if needed?
    var xmlFile = loadXMLDoc("file:///"+xmlSourceFile);
    console.log(xmlFile);
    
    
    //displayMyArticles( maxWords, sectionID );
}

function displayMyArticles( maxWords, sectionID ){
    
}
