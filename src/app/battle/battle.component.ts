import { Component, ViewChild } from '@angular/core';
import { RecortRtcComponent } from '../rtc/recordrtc.component';
import { AudioService } from '../rtc/audio.service';
import { SentimentResult } from '../models/sentimentresult';
import { Response } from '@angular/http';

enum BattleResult {
    P1_WINNER,
    P2_WINNER,
    TIE
}

@Component({
    selector: 'battle',
    templateUrl: 'battle.html',
    styleUrls: ['battle.scss'],
    providers: [AudioService]
})
export class BattleComponent {
    @ViewChild('p1Recorder') public p1Recorder: RecortRtcComponent;
    @ViewChild('p2Recorder') public p2Recorder: RecortRtcComponent;

    public p1Result: SentimentResult = SentimentResult.NULL_OBJECT;
    public p2Result: SentimentResult = SentimentResult.NULL_OBJECT;
    public battleResult: BattleResult;

    private hasP1Gone = false;
    private hasP2Gone = false;

    constructor(private audioService: AudioService) {}

    receiveP1Blob(blob: any): void {
        console.log(blob);
        this.audioService.submit(blob)
            .subscribe((res: Response) => {
                this.hasP1Gone = true;
                res = res.json();
                let result = SentimentResult.from(res);
                this.p1Result = result;
                this.checkIfShouldEndGame();
            });
    }

    receiveP2Blob(blob: any): void {
        console.log(blob);
        this.audioService.submit(blob)
            .subscribe((res: Response) => {
                this.hasP2Gone = true;
                res = res.json();
                let result = SentimentResult.from(res);
                this.p2Result = result;
                this.checkIfShouldEndGame();
            });
    }

    isEndOfGame(): boolean {
        return this.battleResult !== undefined;
    }

    didP1Win(): boolean {
        return this.battleResult === BattleResult.P1_WINNER;
    }

    isTie(): boolean {
        return this.battleResult === BattleResult.TIE;
    }

    private checkIfShouldEndGame(): void {
        if (this.hasP1Gone && this.hasP2Gone) {
            this.determineWinner();
        }
    }

    private determineWinner(): void {
        if (this.p1Result.getScore() < this.p2Result.getScore()) {
            this.battleResult = BattleResult.P1_WINNER;
        } else if (this.p1Result.getScore() > this.p2Result.getScore()) {
            this.battleResult = BattleResult.P2_WINNER;
        } else {
            this.battleResult = BattleResult.TIE
        }
    }
}