export class SentimentResult {
    rating: number = 0.3;

    static from(json: any): SentimentResult {
        return new SentimentResult(json.rating);
    }

    constructor(rating: number) {
        this.rating = rating;
    }
}