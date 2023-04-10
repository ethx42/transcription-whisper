const fs = require('fs');
const { OpenAIApi } = require('openai');
const { transcribeHandler } = require('..');
const sinon = require('sinon');

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe('transcribeHandler', () => {
  beforeEach(() => {
    sinon.restore();
  });

  test('should return transcription result', async () => {
    const req = { file: { path: 'path/to/audio/file' } };
    const res = mockResponse();
    const resOpenAI = {
      status: 200,
      data: {
        text: 'This is a transcription test.',
      },
    };

    sinon.stub(fs, 'createReadStream').returns('fakeStream');
    sinon.stub(OpenAIApi.prototype, 'createTranscription').resolves(resOpenAI);

    await transcribeHandler(req, res);

    expect(fs.createReadStream.calledWith(req.file.path)).toBeTruthy();
    expect(res.status.calledWith(resOpenAI.status)).toBeTruthy();
    expect(res.json.calledWith({ message: resOpenAI.data.text })).toBeTruthy();
  });

  test('should return an error when OpenAI API call fails', async () => {
    const req = { file: { path: 'path/to/audio/file' } };
    const res = mockResponse();
    const errorResponse = {
      response: {
        status: 400,
        data: {
          error: {
            message: 'Invalid file format.',
          },
        },
      },
    };

    sinon.stub(fs, 'createReadStream').returns('fakeStream');
    sinon.stub(OpenAIApi.prototype, 'createTranscription').rejects(errorResponse);

    await transcribeHandler(req, res);

    expect(fs.createReadStream.calledWith(req.file.path)).toBeTruthy();
    expect(res.status.calledWith(errorResponse.response.status)).toBeTruthy();
    expect(res.json.calledWith({ error: errorResponse.response.data.error.message })).toBeTruthy();
  });
});
