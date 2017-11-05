export class SentimentResult {
    documentSentiment: {magnitude: number, score: number};
    sentences: Array<Sentence>;

    static from(json: any): SentimentResult {
        let sentences = Sentence.from(json.sentences);
        let documentSentiment = {magnitude: json.documentSentiment.magnitude, score: json.documentSentiment.score};
        return new SentimentResult(documentSentiment, sentences);
    }

    constructor(documentSentiment: {magnitude: number, score: number}, sentences: Array<Sentence>) {
        this.documentSentiment = documentSentiment;
        this.sentences = sentences;
    }

    getScore(): number {
        return this.documentSentiment.score * this.documentSentiment.magnitude;
    }
}

export class Sentence {
    sentiment: {magnitude: number, score: number};
    text: string;

    static from(jsonArray: any): Array<Sentence> {
        let result = [];
        for (let json of jsonArray) {
            let sentence = new Sentence();
            sentence.text = json.text.content;
            sentence.sentiment = {magnitude: json.magnitude, score: json.score};
            result.push(sentence);
        }
        return result;
    }
}