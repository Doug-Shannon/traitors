import { Attempt } from './attempt';
import { Record, List } from 'immutable';

export interface IRound {
  currentAttemptNumber?: number;
  attempts?: List<Attempt>;
}

const RoundFactory = Record<IRound>({
  currentAttemptNumber: null,
  attempts: List()
});

export class Round extends RoundFactory implements IRound {
  constructor(config: Partial<IRound>) {
    super(config);
  }

  public Process() {
    // calc currentAttemptNumber
    // for each attempt, attempt.calc
  }
}
