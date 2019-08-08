export class Internationalization {
  public static getByEnv(env: string): (key: string) => string {
    let dictionaly: { [key: string]: string };

    if (env.indexOf("ja_JP") >= 0) {
      dictionaly = {
        question: "コマンドを選択してください",
        FileNotFound: "ファイルが見つかりませんでした",
        commandNotFound: "コマンドが見つかりませんでした"
      };
    } else {
      dictionaly = {
        question: "choice command",
        FileNotFound: "file not found",
        commandNotFound: "command not found"
      };
    }

    return function __(key: string): string {
      return dictionaly[key] ? dictionaly[key] : key;
    };
  }
}
