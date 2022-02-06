import { Answer } from '../Answer/Answer';

export class FakeAnswer implements Answer {
  public equals(answer: Answer): boolean {
    return answer === this;
  }
}
