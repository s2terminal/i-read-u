export class Internationalization {
  public static getByEnv(env: string) {
    let dictionaly;

    if (env.indexOf("ja_JP") >= 0) {
      dictionaly = {
        question: "コマンドを選択してください",
        err: "エラー"
      };
    } else {
      dictionaly = {
        question: "Choice Commands",
        err: "error"
      };
    }

    return function __(key): string {
      return dictionaly[key];
    };
  }
}
