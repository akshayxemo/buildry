export abstract class BaseAgent<I, O> {
  abstract name: string;
  abstract run(input: I): Promise<O>;
}