export class Internationalization {
  public static getByEnv(env: string) {
    let dictionaly: { [key: string]: string };

    if (env.indexOf("ja_JP") >= 0) {
      dictionaly = {
        question: "コマンドを選択してください",
        FileNotFound: "ファイルが見つかりませんでした"
      };
    } else {
      dictionaly = {
        question: "choice command",
        FileNotFound: "file not found"
      };
    }

    return function __(key: string): string {
      return dictionaly[key] ? dictionaly[key] : key;
    };
  }
}
