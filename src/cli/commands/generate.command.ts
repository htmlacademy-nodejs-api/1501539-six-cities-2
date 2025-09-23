import got from 'got';
import { Command } from './command.interface.js';
import { mockApiUrl } from '../../shared/constants/mock-api-url.js';
import { MockData } from '../../shared/types/mock-data.type.js';
import { getErrorMessage, getMockOffer, offerToTsvRow } from '../../shared/helpers/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {
  public getName() {
    return '--generate';
  }

  private async load(url: string = mockApiUrl): Promise<MockData | void> {
    try {
      return await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, getDataUrl] = parameters;
    try {
      const data = await this.load(getDataUrl);
      const tsvFileWriter = new TSVFileWriter(filePath);
      if (data) {
        for (let i = 0; i < Number.parseInt(count, 10); i++) {
          await tsvFileWriter.write(offerToTsvRow(getMockOffer(data)));
        }
      }
    } catch (error) {
      console.error('Can\'t generate data');

      console.error(getErrorMessage(error));
    }
  }
}


