import { Answer } from './Answer';

export class StringAnswer implements Answer {
  public constructor(private text: string) {}
  public static isStringAnswer(answer: Answer): answer is StringAnswer {
    return answer instanceof StringAnswer;
  }
  public equals(answer: Answer): boolean {
    if (!StringAnswer.isStringAnswer(answer)) return false;
    return answer.text === this.text;
  }

}
