import { Component, ViewChild } from '@angular/core';
import { RecortRtcComponent } from '../rtc/recordrtc.component';
import { AudioService } from '../rtc/audio.service';
import { SentimentResult } from '../models/sentimentresult';
import { Response } from '@angular/http';
import { MatSnackBar } from '@angular/material';

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

    constructor(private audioService: AudioService,
                private snackBar: MatSnackBar) {}

    receiveP1Blob(blob: any): void {
        this.audioService.submit(blob)
            .subscribe((res: Response) => {
                this.hasP1Gone = true;
                res = res.json();
                let result = SentimentResult.from(res);
                console.log(result);
                if (result.isEmpty()) {
                    this.popInaudibleToast();
                } else {
                    this.p1Result = result;
                    this.checkIfShouldEndGame();
                }
            });
    }

    receiveP2Blob(blob: any): void {
        this.audioService.submit(blob)
            .subscribe((res: Response) => {
                this.hasP2Gone = true;
                res = res.json();
                let result = SentimentResult.from(res);
                console.log(result);
                if (result.isEmpty()) {
                    this.popInaudibleToast();
                } else {
                    this.p2Result = result;
                    this.checkIfShouldEndGame();
                }
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

    reset(): void {
        this.p1Result = SentimentResult.NULL_OBJECT;
        this.p2Result = SentimentResult.NULL_OBJECT;
        this.battleResult = undefined;

        this.hasP1Gone = false;
        this.hasP2Gone = false;
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

    private popInaudibleToast(): void {
        this.snackBar.open('WHAT?? We can\'t hear your puny voice. Try again.');
    }
}