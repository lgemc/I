from llama_index.llms.ollama import Ollama
from llama_index.core import SimpleDirectoryReader, get_response_synthesizer
from llama_index.core import DocumentSummaryIndex
from llama_index.core.node_parser import SentenceSplitter
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.core import Settings

directory = '/home/lmanrique/Videos/Youtube/reinforcement-learning-conference'

llm = Ollama(model="llama3.2:3b-instruct-q8_0")
embedding = OllamaEmbedding(
    model_name="nomic-embed-text",
    base_url="http://localhost:11434",
)

Settings.embed_model = embedding

docs = SimpleDirectoryReader(input_files=[f'{directory}/david-silver-towards-superhuman-intelligence.txt']).load_data()
docs[0].doc_id = "video"

splitter = SentenceSplitter(chunk_size=1024)

response_synthesizer = get_response_synthesizer(
    llm=llm,
    response_mode="tree_summarize",
)

doc_summary_index = DocumentSummaryIndex.from_documents(
    docs,
    llm=llm,
    transformations=[splitter],
    response_synthesizer=response_synthesizer,
    show_progress=True
)

print(doc_summary_index.get_document_summary("video"))