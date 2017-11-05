import { Component, ViewChild } from '@angular/core';
import { RecortRtcComponent } from '../rtc/recordrtc.component';
import { AudioService } from '../rtc/audio.service';
import { SentimentResult } from '../models/sentimentresult';

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

    public p1Result: SentimentResult;
    public p2Result: SentimentResult;
    public battleResult: BattleResult;

    constructor(private audioService: AudioService) {}

    receiveP1Blob(blob: any): void {
        console.log(blob);
        this.audioService.submit(blob)
            .subscribe((result: SentimentResult) => {
                this.p1Result = result;
                this.checkIfShouldEndGame();
            });
    }

    receiveP2Blob(blob: any): void {
        console.log(blob);
        this.audioService.submit(blob)
            .subscribe((result: SentimentResult) => {
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
        if (this.p1Result && this.p2Result) {
            this.determineWinner();
        }
    }

    private determineWinner(): void {
        if (Math.abs(this.p1Result.rating) > Math.abs(this.p2Result.rating)) {
            this.battleResult = BattleResult.P1_WINNER;
        } else if (Math.abs(this.p1Result.rating) < Math.abs(this.p2Result.rating)) {
            this.battleResult = BattleResult.P2_WINNER;
        } else {
            this.battleResult = BattleResult.TIE
        }
    }
}