import { MemoryCard } from '../MemoryCard';
import { InMemoryCardStorage } from '../InMemoryCardStorage';
import { FakeAnswer } from '../__doubles__/FakeAnswer';

const createStubMemoryCard = (question: string): MemoryCard => ({
  answer: new FakeAnswer(),
  question,
  type: 'string'
});

describe('InMemoryCardStorage', () => {
  let memoryCardStorage: InMemoryCardStorage;

  const getArrayFromIterableCards =
    (iterableCards: Iterable<MemoryCard>): Array<MemoryCard> => Array.from(iterableCards);

  const compareMemoryCard = (a: MemoryCard, b: MemoryCard) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const testStorageContent =
    async (expectedContent: Array<MemoryCard>): Promise<void> => {
      const content = await memoryCardStorage.getCards();
      expect(content).toHaveLength(expectedContent.length);

      const contentArray = getArrayFromIterableCards(content);
      
      const isEqual =
        contentArray
          .every(card1 => expectedContent
            .some(card2 => compareMemoryCard(card1, card2)));

      expect(isEqual).toBe(true);
    };

  beforeEach(() => { memoryCardStorage = new InMemoryCardStorage(); });

  it('should get zero cards after init', async () => {
    const memoryCards = await memoryCardStorage.getCards();
    expect(memoryCards).toHaveLength(0);
  });

  it('should return one card after insert', async () => {
    const stubMemoryCard = createStubMemoryCard('question1');
    memoryCardStorage.insertCard(stubMemoryCard);

    await testStorageContent([stubMemoryCard]);
  });
  it('should return zero cards after deletion', async () => {
    const card = createStubMemoryCard('question2');
    memoryCardStorage.insertCard(card);
    memoryCardStorage.removeCard(card);

    await testStorageContent([]);
  });

  it('should do nothing in case of deletion not inserted card', async () => {
    try {
      await memoryCardStorage.removeCard(createStubMemoryCard('question3'));
    } catch (e) {
      fail('It should not have thrown error');
    }
  });

  it('should return 1 card after 3 insertion and 1 deletion', async () => {
    const cardsToInsert = [
      createStubMemoryCard('question4'),
      createStubMemoryCard('question5'),
      createStubMemoryCard('question6')
    ];

    cardsToInsert.forEach(card => memoryCardStorage.insertCard(card));

    memoryCardStorage.removeCard(cardsToInsert[1]);
    await testStorageContent([cardsToInsert[0], cardsToInsert[2]]);
  });
});
