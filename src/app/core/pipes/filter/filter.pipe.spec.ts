import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    pipe.transform('1', 2);
    pipe.transform([{reference: 'data'}], 2);
    pipe.removeAccents('á');
    expect(pipe).toBeTruthy();
  });
});
