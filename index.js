const fs = require('fs');
const natural = require('natural');

class Document{
    constructor(title, content){
        this.title=title;
        this.content=content;
    }
}


class DocumentCollection{
    constructor(){
        this.documents = [];
    }

    addDocument(document){
        this.documents.push(document);
    }

    addDocumentStoredLocally(filePaths){
        const tokenizer = new natural.WordTokenizer();

        filePaths.forEach(filePath => {
            const documentContent = fs.readFileSync(filePath, 'utf-8'); //read the content
            const tokens = tokenizer.tokenize(documentContent); //tokenize the content
            const fileName = filePath.split('/').pop(); //pop the file name
            const document = new Document(fileName, tokens);
            this.addDocument(document);
        })
    }

    getDocumentByTitle(title){
        return this.documents.find(doc => doc.title === title)
    }
}


class searchEngine{
    constructor(documentCollection){
        this.documentCollection = documentCollection;
    }
    
    calculateLevenshteinDistance(str1, str2){
        return natural.LevenshteinDistance(str1, str2);
    }
    
    search(querry){
        const tokenizer = new natural.WordTokenizer();
        const querryTokens = tokenizer.tokenize(querry.toLowerCase());

        this.documentCollection.documents.forEach(document => {
            const documentTokens = document.content.map(token => token.toLowerCase());
            const distances = querryTokens.map(querryToken => {
                return Math.min(...documentTokens.map(documentToken => 
                    this.calculateLevenshteinDistance(querryToken, documentToken)
                ));
            });

            //distance between two strings according to insertion, deletion and substitution
            const averageDistance = distances.reduce((sum, distance) => sum + distance, 0) / distances.length;
            console.log(`Document: ${document.title}, average distance: ${averageDistance}`);
            // const querryTokenFound = querryTokens.some(querryToken => documentTokens.includes(querryToken))
            // if(querryTokenFound)
            //     console.log(`Document: ${document.title}, querry token found: ${querry}`);
            // else
            //     console.log("nothing found")
        });

    }
}

const filePaths = ['C:/Users/Hamze/Desktop/test/fastFood.txt', 'C:/Users/Hamze/Desktop/test/bikes.txt'];

const documentCollection = new DocumentCollection();

documentCollection.addDocumentStoredLocally(filePaths);

const document1 = documentCollection.getDocumentByTitle('fastFood.txt');
const document2 = documentCollection.getDocumentByTitle('bikes.txt')

const searchEngin = new searchEngine(documentCollection);

searchEngin.search("brgar");



// console.log('document 1: ', document1);
// console.log('document 2: ', document2);