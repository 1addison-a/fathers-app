// ============================================================
// Text Chunking
// Splits documents into overlapping chunks and stores parent context
// Small chunk = precise retrieval
// Parent chunk = richer context sent to the model
// ============================================================

const CHUNK_SIZE = 500;        // target words per small chunk
const CHUNK_OVERLAP = 100;     // word overlap between chunks
const PARENT_MULTIPLIER = 3;   // parent chunk = ~3x the small chunk

// Split text into sentences (rough but effective)
function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .filter((s) => s.length > 10);
}

// Group sentences into chunks of approximately targetWords words
function groupIntoChunks(sentences, targetWords, overlapWords) {
  const chunks = [];
  let current = [];
  let currentWordCount = 0;

  for (const sentence of sentences) {
    const wordCount = sentence.split(/\s+/).length;
    current.push(sentence);
    currentWordCount += wordCount;

    if (currentWordCount >= targetWords) {
      chunks.push(current.join(" "));

      // Backtrack for overlap
      let overlapCount = 0;
      const overlapSentences = [];
      for (let i = current.length - 1; i >= 0; i--) {
        const wc = current[i].split(/\s+/).length;
        if (overlapCount + wc > overlapWords) break;
        overlapSentences.unshift(current[i]);
        overlapCount += wc;
      }

      current = overlapSentences;
      currentWordCount = overlapCount;
    }
  }

  if (current.length > 0) chunks.push(current.join(" "));
  return chunks;
}

// Main chunking function
// Returns array of { chunkText, parentText, chunkIndex }
export function chunkDocument(text, sourceDoc) {
  // Clean the text
  const cleaned = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[^\S\n]+/g, " ")
    .trim();

  const sentences = splitSentences(cleaned);

  // Create small chunks for retrieval
  const smallChunks = groupIntoChunks(sentences, CHUNK_SIZE, CHUNK_OVERLAP);

  // Create parent chunks (larger windows for context)
  const parentChunks = groupIntoChunks(
    sentences,
    CHUNK_SIZE * PARENT_MULTIPLIER,
    CHUNK_OVERLAP * PARENT_MULTIPLIER
  );

  // Map each small chunk to its nearest parent chunk
  return smallChunks.map((chunkText, i) => {
    // Find the parent chunk whose center is closest to this chunk's position
    const position = i / smallChunks.length;
    const parentIndex = Math.floor(position * parentChunks.length);
    const parentText = parentChunks[Math.min(parentIndex, parentChunks.length - 1)];

    return {
      chunkText,
      parentText,
      chunkIndex: i,
      sourceDoc,
    };
  });
}
