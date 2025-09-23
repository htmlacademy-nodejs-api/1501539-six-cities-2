import { Command } from './command.interface.js';
import { getErrorMessage, tsvRowToOffer } from '../../shared/helpers/index.js';
import { TSVFileReader, TSVFileReaderEvents } from '../../shared/libs/file-reader/index.js';

export class ImportCommand implements Command {
  public getName() {
    return '--import';
  }

  private onImportedLine(row:string) {
    const offer = tsvRowToOffer(row);
    console.log(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [tsvFilePath] = parameters;
    const fileReader = new TSVFileReader(tsvFilePath.trim());

    fileReader.on(TSVFileReaderEvents.LINE, this.onImportedLine);
    fileReader.on(TSVFileReaderEvents.END, this.onCompleteImport);
    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${tsvFilePath}`);
      console.error(getErrorMessage(error));
    }
  }
}
