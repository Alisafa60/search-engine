const fs = require('fs');

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
        filePaths.forEach(filePath => {
            const documentContent = fs.readFileSync(filePath, 'utf-8');
            const fileName = filePath.split('/').pop();
            const document = new Document(fileName, documentContent);
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
    
}

const filePaths = ['C:/Users/Hamze/Desktop/test/test-document.txt'];

const documentCollection = new DocumentCollection();

documentCollection.addDocumentStoredLocally(filePaths);

const document1 = documentCollection.getDocumentByTitle('test-document.txt');

console.log('document read:', document1);