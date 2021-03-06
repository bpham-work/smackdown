export class SentimentResult {
    documentSentiment: {magnitude: number, score: number};
    sentences: Array<Sentence> = [];

    static NULL_OBJECT = new SentimentResult();

    static from(json: any): SentimentResult {
        let sentences = Sentence.from(json.sentences);
        let documentSentiment = {magnitude: json.documentSentiment.magnitude, score: json.documentSentiment.score};
        return new SentimentResult(documentSentiment, sentences);
    }

    constructor(documentSentiment?: {magnitude: number, score: number}, sentences: Array<Sentence> = []) {
        this.documentSentiment = documentSentiment;
        this.sentences = sentences;
    }

    getScore(): number {
        if (!this.documentSentiment && this.sentences.length === 0) {
            return 0;
        }
        let result = this.documentSentiment.score * this.documentSentiment.magnitude;
        return Math.round(result * 100) / 100;
    }

    getText(): string {
        let text = '';
        for (let sent of this.sentences) {
            text += sent.text + '\n';
        }
        return text;
    }

    isEmpty(): boolean {
        return this.sentences.length === 0;
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
            sentence.sentiment = {magnitude: json.sentiment.magnitude, score: json.sentiment.score};
            result.push(sentence);
        }
        return result;
    }
}