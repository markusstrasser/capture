export default `
<rules>
Rule: Write Atomic Flashcards
Cards should be short. They should refer to as little information as possible. They should be like chemical bonds, linking individual atoms of knowledge.
This is the most important thing. By far the worst failure mode is to put too much in a flashcard.
There’s two reasons for this rule:
		Larger cards are harder to remember.
		It’s harder to objectively grade yourself: when you reveal the answer, you might have got some things right and some things wrong. If you click forget, you will be over-reviewing the parts you already know. If you click remembered, you will under-review the parts you forgot.


There is one exception to this: you can have big cards if you also have smaller cards that add up to the same information. You can think of the larger card as testing that you can collate the information from the smaller cards.
Rule: Repeat Yourself
Memory is frequency times volume. Individual cards should be extremely brief, but your deck as a whole can be as repetitive as you want.
AVOID cards being answerable by pattern recognition over time.
Key Contradictions/Tensions:
		Multiple Angles vs. Atomic Facts


		Previous rules stressed "one atomic fact per card"
		New text suggests "encode ideas from multiple angles" and "access an idea from multiple angles"
		Resolution: These can be reconciled by having multiple separate atomic cards approaching the same concept from different angles, rather than cramming multiple perspectives into one card



Rule: Write Two-Way Questions
When possible, ask questions in two directions.
Whenever you have a term with a definition, the obvious thing to do is to ask for the definition from the term, e.g.:
Q: What is the order of a group?
A: The cardinality of its underlying set.


But you can also ask for the term from the definition, e.g.:
Q: What is the term for the cardinality of a group?
A: The group’s order.


When you have some notation, like RR for the real numbers, or dim⁡VdimV for the dimension of a vector space, the natural thing to ask is what the notation means.
Q: What does RR stand for?
A: The set of real numbers.


You can also ask the question backwards:
Q: What is the notation for the set of real numbers?
A: RR


Rule: Ask Questions in Multiple Ways
Ask questions in multiple ways. Ask for formal and informal definitions of terms. Ask for the formal and informal statements of a theorem. Ask questions forwards and backwards. Add contextual questions: “what is the intutition for [concept]?”. Add questions that link different concepts across your knowledge graph.
The more interlinked your knowledge graph is, the better.
Rule: Concept Graphs
It can help to visualize the concepts you’re acquiring as being like a graph, where each node represents a discrete concept having certain properties, and the edges in the graphs are questions which get you from one concept to another.
Rule: Cache Your Insights
When studying, you will often infer new knowledge that is not explicitly written down in the text by thinking about what you’ve just read. After verifying that your inference is actually true, it can be helpful to “cache your insight”—to make a flashcard for that new discovered piece of knowledge.
Rule: Learning Hierarchies
A lot of knowledge is hierarchical, of the form “Foo can be either A, B, or C”, or, dually, “A is a kind of Foo”. By analogy to OOP: these concepts are joined by superclass and subclass relations.
The idea is to ask questons in the top down direction (“What are the subclasses of Foo?”) and the bottom-up direction (“What is Bar a subclass of?”).
This ties into keeping flashcards atomic. Even when some information is not hierarchical, intrinsically, breaking down large flashcards into smaller flashcards is fundamentally building a hierarchy of flashcards.

Examples
Many of these examples are overkill: we collect a lot more flashcards than the subject deserves. But this is to illustrate the general rules. With experience, you can learn how many questions a particular topic requires, and different volumes of your knowledge graph will be more or less interlinked.

Example: Magma Formation
From my geology notes:
Magma is liquid rock under the Earth’s surface.
The three magma-forming processes are:
		Increasing Temperature: increasing temperature can melt rock.
		Decreasing Pressure: when the pressure drops, atoms are more free to move, and rock becomes liquid.
		Addition of Water: water lowers the melting point of rock, because the water molecules disrupt the crystal bonds.


Magma forms in three places:
		Hot spots: as hot rock rises, pressure decreases and it becomes magma.
		Rift zones: as tectonic plates are pulled apart, hot rock rises (because it is less dense) to plug the gap and melts due to decreasing pressure.
		Subduction zones: water-rich ocean lithosphere sinks into the mantle. The water heats up and rises, adding water to the overlying rock, which the melts.


Let’s break this down hierarchically. We want to memorize three things:
		What magma is.
		How it forms.
		Where it forms.


First, the definition:
QUESTION
ANSWER
What is magma?
Liquid rock under the Earth’s surface.
What is the term for liquid rock under surface of the Earth?
Magma.
Second, we want to know how magma forms. A common mistake here would be to put the magma-forming processes and their explanations in the same flashcard. Rather, to keep each card as small as possible, we want to separate the list of processes from their definitions.
So we first as for a list of mechanisms:
QUESTION
ANSWER
What are the magma-forming processes?
Increasing temperature, decreasing pressure, addition of water.
And then we ask for an explanation of each. We don’t really need to ask why adding temperature melts rock:
QUESTION
ANSWER
Why does decreasing pressure melt rock?
Because the atoms are more free to move.
Why does adding water lower the melting point of rock?
Because water molecules disrupt the bonds in the rock minerals.
Third: where magma is found. Again, we separate the list from the details:
QUESTION
ANSWER
Where does magma form?
Over hot spots, in rift zones, and in subduction zones.
Then we ask for details. For each place where magma forms, we ask both which processes are involved, and what the full causal explanation is. We also ask the question backward: which places involve a given process.
QUESTION
ANSWER
What magma-forming process happens over a hot spot?
Pressure-release melting.
What magma-forming process happens in a rift zone?
Pressure-release melting.
What magma-forming process happens in a subduction zone?
Increasing temperature and addition of water.
Where does magma form due to pressure release?
Hot spots and rift zones.
Where does magma form due to increasing temperature and the addition of water?
Subduction zones.
How does magma form in a hot spot?
As hot mantle rock rises, the decrease in pressure causes it to melt.
How does magma form in a rift zone?
As the tectonic plates move apart, hot rock rises to fill the gap, and the decrease in pressure causes it to melt.
How does magma form in a subduction zone?
Waterlogged crust dives into the mantle, the water turns to steam and rises, the addition of water to overlying rock causes it to melt.


Example: Neural Cells
Cells in the nervous system are divided into neurons and glia. Glial cells are divided into macroglia and microglia. Macroglia are divided into astrocytes, oligodendrocytes, and Schwann cells.
Visually:

We first write the top-down questions:
QUESTION
ANSWER
What kinds of cell make up the nervous system?
Neurons and glia.
What are the kinds of glial cell?
Microglia and macroglia.
What are the kinds of macroglia?
Astrocytes, oligodendrocytes, and Schwann cells.
And the bottom-up questions. We don’t ask these when the answers are obvious: “what are microglia/macroglia a kind of” has an obvious answer.
QUESTION
ANSWER
Astrocytes are a kind of…
Macroglia.
Oligodendrocytes are a kind of…
Macroglia.
Schwann cells are a kind of…
Macroglia.
Example: Neuron Types
This is a brief example about keeping cards short and using hierarchies to break things down.
From my neuroscience notes:
Neurons can be divided into three categories by their function:
		Sensory: feed sensory information into the brain.
		Motor: send motor commands to the muscles.
		Interneurons: connect within the CNS. These are further divided into:
		Local: form circuits with nearby neurons.
		Relay: have long axons and communicate across brain regions.
		


Let’s start by doing this the wrong way, by loading too much information into one card.
QUESTION
ANSWER
What are the functional categories of neuron?
Sensory: feed sensory information into the brain.Motor: send motor commands to the muscles.Interneurons: connect within the CNS.(😩 too long)
What are the different types of interneuron?
Local: form circuits with nearby neurons.Relay: have long axons and communicate across brain regions.(😩 too long)
Let’s first break this down by separating terms from definitions:
QUESTION
ANSWER
What are the functional categories of neuron?
Sensory, motor, interneurons.
What are sensory neurons?
Neurons which feed information into the brain.
What are motor neurons?
Neurons which send commands to the muscles.
What are interneurons?
Neurons which connect within the CNS.
What are the types of interneuron?
Local, relay.
What are local interneurons?
Interneurons that form circuits with nearby neurons.
What are relay interneurons?
Interneurons have long axons and communicate across brain regions.
Now we ask the questions in the backward direction: from the definition to the term:
QUESTION
ANSWER
What is the term for a neuron that feeds information into the brain?
Sensory neuron.
What is the term for a neuron that sends commands to the muscles?
Motor neuron.
What is the term for a neuron that connects within the CNS?
Interneuron.
What is the term for an interneuron that forms circuits with nearby neurons?
Local interneuron.
What is the term for an interneuron that communicates across brain regions?
Relay interneuron.
Example: Vector Spaces
Here’s what we want to learn:
A vector space, informally, is a set whose elements—called vectors—can be added or scaled.
More formally: a vector space over a field FF is a set VV plus two operations:
		Vector addition: V×V→VV×V→V
		Scalar multiplication: V×F→VV×F→V


Satisfying the following axioms:
		Commutativity of Addition u+v=v+uu+v=v+u
		Associativity of Addition u+(v+w)=(u+v)+wu+(v+w)=(u+v)+w
		Identity of Addition ∃0∈V:v+0=v∃0∈V:v+0=v
		Inverse of Addition ∀v∈V,∃−v∈V:v+(−v)=0∀v∈V,∃−v∈V:v+(−v)=0
		Identity of Scaling 1v=v1v=v
		Distributivity ∀v∈V,a,b∈F:(a+b)v=av+bv∀v∈V,a,b∈F:(a+b)v=a**v+b**v


We have to break this down. Severely. We will do this step by step.
First, we have to separate the informal (intuitive) and formal definitions:
QUESTION
ANSWER
Informally: what is a vector space?
A set whose elements can be added or scaled.
Formally: what is a vector space?
A vector space over a field FF is a set VV plus two operations: vector addition and scalar multiplication.
We add one brief question about notation (you may choose to skip this one, it’s an example):
QUESTION
ANSWER
What are the elements of a vector space called?
Vectors.
Now we ask about the signatures of the operations:
QUESTION
ANSWER
What is the signature of vector addition?
V×V→VV×V→V
What is the signature of scalar multiplication?
V×F→VV×F→V
Next, we ask for the axioms:
QUESTION
ANSWER
What are the axioms that define a vector space?
Commutativity of AdditionAssociativity of AdditionIdentity of AdditionInverse of AdditionIdentity of ScalingDistributivity
Finally, we ask what each axiom means:
QUESTION
ANSWER
Vector spaces: state: commutativity of addition
u+v=v+uu+v=v+u
Vector spaces: state: associativity of addition
u+(v+w)=(u+v)+wu+(v+w)=(u+v)+w
Vector spaces: state: identity of addition
∃0∈V:v+0=v∃0∈V:v+0=v
Vector spaces: state: inverse of addition
∀v∈V,∃−v∈V:v+(−v)=0∀v∈V,∃−v∈V:v+(−v)=0
Vector spaces: state: identity of scaling
1v=v1v=v
Vector spaces: state: distributivity
∀v∈V,a,b∈F:(a+b)v=av+bv∀v∈V,a,b∈F:(a+b)v=a**v+b**v
Graphically, you can try visualizing the flashcards and their relationships like this:

If you want to be extra thorough, you can also write the backwards questions:
QUESTION
ANSWER
What is the term for a set whose elements can be added or scaled?
A vector space.
Name this axiom: u+v=v+uu+v=v+u
Commutativity of Addition
Name this axiom: u+(v+w)=(u+v)+wu+(v+w)=(u+v)+w
Associativity of Addition
Name this axiom: ∃0∈V:v+0=v∃0∈V:v+0=v
Identity of Addition
Name this axiom: ∀v∈V,∃−v∈V:v+(−v)=0∀v∈V,∃−v∈V:v+(−v)=0
Inverse of Addition
Name this axiom: 1v=v1v=v
Identity of Scaling
Name this axiom: ∀v∈V,a,b∈F:(a+b)v=av+bv∀v∈V,a,b∈F:(a+b)v=a**v+b**v
Distributivity

Example: Logical Consequence
From my notes on logic:
The two notions of logical consequence are:
		Semantic Consequence: QQ is a semantic consequence of PP iff, in every interpretation where PP is true, QQ is also true. This is denoted P⊨QP⊨Q.
		Syntactic Consequence: QQ is a syntactic consequence of PP iff there exists a proof from PP to QQ. This is denoted P⊢QP⊢Q.


Semantic consequence is about interpretations, while syntactic consequence is about proofs.
We begin with the most basic question:
QUESTION
ANSWER
What are the two notions of logical consequence?
Semantic and syntactic.
Then we ask questions specifically about semantic consequence:
QUESTION
ANSWER
Define semantic consequence
QQ is a semantic consequence of PP iff in every interpretation where PP is true, QQ is also true.
What’s the notation for “QQ is a semantic consequence of PP”?
P⊨QP⊨Q
What does P⊨QP⊨Q mean?
QQ is a semantic consequence of PP
Semantic consequence connects sentences by…
Interpretations.
Which notion of logical consequence involves interprerations?
Semantic consequence.
And then about syntactic consequence:
QUESTION
ANSWER
Define syntactic consequence
QQ is a syntactic consequence of PP iff there is a proof from PP to QQ.
What’s the notation for “QQ is a syntactic consequence of PP”?
P⊢QP⊢Q
What does P⊢QP⊢Q mean?
QQ is a syntactic consequence of PP
Syntactic consequence connects sentences by…
Proofs.
Which notion of logical consequence involves proofs?
Syntactic consequence.


Example: Rational Numbers
Let’s commit this to spaced repetition:
The set of rational numbers, denoted QQ, is the set of fractions with integer numerator and denominator, where the denominator is non-zero.
Formally:
Q={pq|p,q∈Z∧q≠0}Q={qpp,q∈Z∧q\=0}

The QQ stands for quotient.
QUESTION
ANSWER
Informally, what is the set of rational numbers?
The set of fractions with integer numerator and denominator, where the denominator is non-zero.
Formally, what is the set of rational numbers?
Q={pq|p,q∈Z∧q≠0}Q={qpp,q∈Z∧q\=0}
What's the term for the set of integer fractions?
The rational numbers.
What is the name of this set? {pq|p,q∈Z∧q≠0}{qpp,q∈Z∧q\=0}
The rational numbers.


Example: Voltage
This is an example of asking questions in different ways
The voltage between two points AA and BB can be defined as either: Voltage can be defined as:
		The difference in electric potential between the two points.
		The amount of work done by a 1C1C particle as it travels from AA to BB.


The idea here is:
		We first ask for the definition of voltage in terms of both electric potential and work.
		We also ask what is the term for each definition.


Which gives us the following flashcards:
QUESTION
ANSWER
What is voltage in terms of electric potential?
Difference in electric potential between two points.
What is voltage in terms of work?
Work done by a 1C particle as it travels from A to B.
What is the term for the difference in electric potential between two points?
Voltage.
What is the term for the work done by a 1C particle as it travels between two points?
Voltage.
Example: Isomers
Two chemical compounds are said to be isomers of each other if they have the same chemical formula (same number of atoms of each element) but their three-dimensional structure differs.
Isomers can be divided into:
		Structural Isomers: the chemical formula is the same but the atoms are bonded differently.
		Stereoisomers: the chemical formula and the bonds are the same but the spatial arrangement is different. These are divided into:
		Conformational Isomers: can be intercoverted by rotating about a sigma bond.
		Configurational Isomers: cannot be interconverted without breaking a bond. These are further subdivided into:
		Enantiomers: non-superposable mirror images. Also called optical isomers because of the way they reflect plane-polarized light.
		Diastereomers: not enantiomers. One important subtype is:
		Cis/Trans Isomers: occur when two functional groups can find themselves on the same or opposite sides of a rigid structure. When both functional groups are on the same side of the rigid structure, that is a cis isomer; when they are on opposite sides, that is a trans isomer.
		
		
		


This is an example of a cis isomer:

This is an example of a trans isomer:

This is fairly straightforward: we have to learn a hierarchy of definitions. We’ll divide this into two tasks:
		First, definitions. Ask questions from the term to the definition and from the definition to the term.
		Second, hierarchy: ask about subtypes and supertypes.


So let’s begin with the definitions. First we ask the questions in the forward direction:
QUESTION
ANSWER
What is an isomer?
Two compounds are isomers when they have the same chemical formula but different 3D structures.
What are structural isomers?
Compounds with the same formula but the atoms have a different bond graph..
What are stereoisomers?
Compounds with the same formula and bond graph but different spatial arrangement.
What are conformational isomers?
Isomers that can be interconverted by rotating about a sigma bond.
What are configurational isomers?
Isomers that cannot be interconverted without breaking a bond.
What are enantiomers?
Non-superposable mirror images.
What are diastereomers?
Stereoisomers that are not enantiomers.
What are cis/trans isomers?
Isomers where two functional groups are on the same or opposite sides of a rigid structure.
And now the definitions, in the backward direction:
QUESTION
ANSWER
What is the term for compounds with the same chemical formula but different 3D structures?
Isomer
What is the term for isomers with the same formula but a different bond graph?
Structural Isomer
What is the term for isomers that have the same bond graph different spatial arrangement?
Stereoisomer
What is the term for isomers that can be interconverted by rotating about a sigma bond?
Conformational Isomer
What is the term for isomers that cannot be interconverted without breaking a bond?
Configurational Isomer
What is the term for non-superposable mirror images?
Enantiomer
What is the term for stereoisomers that are not enantiomers?
Diastereomer
What is the term for isomers where two functional groups are on the same or opposite sides of a rigid structure?
Cis/Trans Isomer
We left some information out, to keep the cards atomic, now we have to ask questions to recall that information:
QUESTION
ANSWER
What is another term for enantiomer?
Optical isomer.
Why are enantiomers also called optical isomers?
Because of the way they reflect plane-polarized light.
What is an optical isomer?
Another term for enantiomer.
What is a cis isomer?
One with both functional groups on the same side of a rigid structure.
What is the term for an isomer with both functional groups on the same side a rigid structure.
A cis isomer.
What is a trans isomer?
One with both functional groups on the same side of a rigid structure.
What is the term for an isomer with both functional groups on the same side a rigid structure.
A trans isomer.
Now we move on to the hierarchy, which connects these concepts. We first ask the questions in the downward direction, from parent to child:
QUESTION
ANSWER
What are the subtypes of isomers?
Structural isomers, stereoisomers.
What are the subtypes of stereoisomers?
Conformational isomers, configurational isomers.
What are the subtypes of configurational isomers?
Enantiomers, diastereomers.
What are the subtypes of diastereomers?
Cis/trans isomers.
And now in the upward direction:
QUESTION
ANSWER
Structural isomers are a kind of …
Isomer
Stereoisomers are a kind of …
Isomer
Conformational isomers are a kind of …
Stereoisomer
Configurational isomers are a kind of …
Stereoisomer
Enantiomers are a kind of …
Configurational isomer
Diastereomers are a kind of …
Configurational isomer
Cis/trans isomers are a kind of …
Diastereomer

---

Also try to integrate these principles:

Generating High-Quality Spaced Repetition Flashcards
Objective: Given some {material}, generate high-quality, primarily atomic flashcards for Spaced Repetition Systems (SRS) like Anki. These cards should be optimized for long-term memory retention of fundamental knowledge, featuring answers that allow for quick verification and efficient review.
Core Principles for Effective SRS Flashcards (Prioritize These):
		Atomic Answers for Focused Review: Prioritize single, focused pieces of information or key relationships on the answer side. This ensures clear success or failure during review, avoiding ambiguity. The question provides necessary context. For example, consider this well-designed card illustrating a focused answer:  What is the information processing rate during blindfolded Rubik's cube inspection [World Record, 2023]? ; ~12bits/s   Here, the answer directly provides the information rate, making review straightforward.
		Active Recall over Passive Recognition: Design questions that demand active retrieval from memory, moving beyond simple recognition. Avoid trivially guessable yes/no questions or formats that don't require genuine recall effort.
		Enduring Relevance: Focus on Fundamentals: Prioritize testing core concepts, fundamental principles, and established knowledge. Be selective about including fleeting trends or overly specific details unless they strategically support understanding enduring concepts.
		Contextual Clarity for Independent Understanding: Ensure each question provides sufficient context to be understood independently, even after long intervals. Avoid reliance on recall from other specific cards. However, avoid making the context so leading that the answer becomes trivially obvious.
		Verifiable Answers for Clear Success/Failure: Each question should have an answer allowing for quick and clear determination of recall accuracy. Understandable explanations should be implicitly available if the answer is incorrect. While approximations are acceptable, answers should be as unambiguous as the domain allows.
		Concise Language for Efficient Review: Use clear, straightforward language in both questions and answers. Avoid unnecessary jargon or complex sentence structures. Brevity enhances review efficiency.
		Concreteness for Tangible Understanding: Focus on testing understanding of specific concepts, examples, or relationships. When dealing with abstract concepts, connect them to concrete examples or applications.


Instructions for Crafting Effective Flashcard Prompts:
Question Formulation:
		Be Specific: Clear and specific instructions lead to accurate and relevant responses.
		Instead of "Tell me about AI", ask "Explain the difference between artificial intelligence and machine learning".
		Instead of "Tell me about climate change," use "Explain the main causes of climate change and its impact on global ecosystems."
		 
		Provide Sufficient Context: Include all necessary information for understanding the query, even after a long interval.
		Specify Answer Format (If Needed): Indicate the expected answer type (e.g., unit of measurement, specific term).
		Source Attribution for Context and Recency: Use [Author, YYYY] at the beginning of the question for empirical claims, specialized terminology, recent findings, or novel assertions.
		For example:
		   [Slowness of Being, 2024] What is the 'sifting number' (Si) in human information processing? ; 10^8 (input/output bandwidth)  
		The source attribution here provides context and authority for the specialized term.
		 
		Structure for Clarity: Start with necessary conditions or constraints, then provide supporting context, and finally, the core of the question.


Answer Formulation:
		Focus on the Core Information/Relationship: The answer should directly address the core element being tested.
		Be Direct and Unambiguous (Where Domain Allows): The answer should be clear, concise, and leave minimal room for interpretation, acknowledging domain variability.
		Set a Format: Define the output format (list, paragraph, bullet points, etc.) to guide the response.
		“Please output 3 key differences between AI and machine learning in a bullet list, and then write one descriptive paragraph about each point”.
		“Please list the top 5 renewable energy sources and provide a brief description of each.”
		 
		Maintain Consistent Formatting: Use consistent formatting for answers across related cards.
		Use Precise Units and Notation: Employ standard units (e.g., bits/s) and notation when appropriate.
		Handle Numerical Answers Contextually: Use ~ for approximations. Maintain necessary precision for core factual data. Prioritize memorability for concepts with inherent variability.
		Compare these examples illustrating the handling of numerical answers:
		   What is the total information capacity of one human eye's cone photoreceptors? ; ~1.6 Gb/s  
		(Approximation is acceptable here)
		   What is the value of Pi to five decimal places? ; 3.14159  
		(Precision is necessary in this case)
		 


Content Selection (Focus and Filtering):
		Prioritize Core Principles: Focus on information representing core concepts and fundamental knowledge.
		Be Strategic with Specific Details: Include specific details (dates, records) if they provide valuable context or illustrate the concept effectively.
		Target Knowledge Requiring Active Learning: Focus on testing knowledge that requires actual learning and isn't immediately apparent.


Avoiding Common Mistakes (Anti-Patterns):
		Avoid Answers with Multiple Distinct Pieces of Information: Ensure the answer focuses on a single core piece of information or key relationship.
		Poor Example:
		   What are the three main components of working memory? ; Phonological loop, visuospatial sketchpad, and central executive.  
		Better (Atomic) Examples:
		   What is the function of the phonological loop in working memory? ; Temporarily stores auditory information.    What type of information is processed in the visuospatial sketchpad of working memory? ; Visual and spatial information.    What is the role of the central executive in working memory? ; Manages and allocates resources within working memory.  
		Avoid Questions Allowing Easy or Passive Guessing: Ensure genuine recall effort is required.
		Avoid Information Lacking Long-Term Value (Without Strategic Purpose): Be cautious about including details unlikely to remain relevant unless they serve a clear purpose.
		Avoid Ambiguous Answers: Strive for clarity and verifiability, using approximations thoughtfully.
		Avoid Insufficient Context in Questions: Ensure each question provides enough information for independent understanding.
		Avoid Overly Complex Language: Use clear and concise language.


Formatting Standards:
		Consistent Units: Use the same units for related concepts across different cards.
		Example: Always use "bits/second" for information rate.
		 
		Standard Abbreviations: Utilize standard abbreviations.
		Example: Use "WPM" for words per minute, "Gb/s" for gigabits per second.
		 
		Appropriate Number Formatting: (As detailed in Answer Formulation).


Learning from Examples:
		Before & After - Atomicity:
		Before:
		   According to cognitive psychology, how does expertise affect pattern recognition in data analysis? ; Through a larger repertoire of thinking frames  
		After:
		   In data analysis, what tool do experts possess that enables them to notice patterns novices miss? ; Thinking frames  
		Reasoning: The "After" version has a more focused answer, making it clearer what the user needs to recall.
		 
		Before & After - Clarity and Specificity:
		Before:
		   What is the total information capacity of human cone photoreceptors? ; ~1.6 gigabits/second  
		After:
		   What is the total information capacity of one human eye's cone photoreceptor population? ; ~1.6 Gb/s  
		Reasoning: The "After" version specifies "one eye" for better clarity and uses the standard abbreviation "Gb/s".
		 
		Before & After - Adding Context to the Question:
		Before:
		   What is the information rate for elite Tetris players? ; ~7 bits/s (3-4 pieces/second)  
		After:
		   What is the information rate for elite Tetris players (~4 pieces/second) [Record 2023]? ; ~7 bits/s  
		Reasoning: The "After" version moves the performance context to the question, improving clarity and understanding.
		 


Workflow for Generating SRS Cards (Follow These Steps):
		Identify Atomic Knowledge Units or Key Relationships.
		Draft Initial Card Candidates.
		Apply the Core Principles Checklist.
		Refine for Clarity, Context, and Reviewability.
		Standardize Formatting and Language.
		Review for Anti-Patterns.
		Consider Long-Term Value and Strategic Inclusion of Details.
		Iterate and Improve.


Actively Avoid These Common Mistakes:
		Answers containing multiple distinct pieces of information, hindering clear review.
		Insufficient context in the question, impairing understanding.
		Questions allowing for easy or purely passive guessing.
		Using inconsistent terminology across different cards.
		Including information that is time-sensitive and lacks a strategic purpose for inclusion.
		Writing questions that inadvertently reveal the answer.
		Focusing on abstract concepts without grounding them in concrete examples.
		Creating cards where it's difficult to verify the accuracy of the recalled answer.
		Oversimplifying complex topics with overly simplistic causal explanations.


Additional Examples of Well-Designed Cards:
 What is the information processing rate during blindfolded Rubik's cube inspection [World Record, 2023]? ; ~12bits/s


 What is the information rate during Binary Digit memorization [World Record]? ; ~5 bits/second


 What is the baseline information rate for a single cone photoreceptor? ; ~270 bits/second


 What is the information processing rate for a professional English typist (120 WPM)? ; ~10 bits/second (5 characters/word)


Examples of Poorly Designed Cards:
		"How do personalized knowledge systems handle epistemic disagreements?" ; Too abstract, multiple possible answers
		"What mechanism allows personalized knowledge systems to maintain divergent views..." ; Not concrete enough to test
		"What cognitive mechanism explains experts' superior dataset analysis..." ; Too theoretical, not a single clear answer


Examples of Card Optimization:
BEFORE
AFTER
REASONING
What is the 'sifting number' (Si) in human information processing?;Si = 10^8 (sensory input/behavioral output ratio)
[Slowness of Being, 2024] What is the 'sifting number' (Si) in human information processing?;10^8 (input/output bandwidth)
Simplifies the answer by removing unnecessary context while preserving essential meaning.
What is the total information capacity of the human cone photoreceptor population?;~1.6 gigabits/second
What is the total information capacity of one human eye's cone photoreceptors?;~1.6 Gb/s
Specifies system boundary (one eye) and standardizes units for clarity.
What is the information rate for elite Tetris players?;~7 bits/s (3-4 pieces/second)
What is the information rate for elite Tetris players (~4 pieces/second) [Record 2023]?;~7 bits/s
Adds relevant performance context and moves it from the answer to the question for clarity.
What is the average firing rate of neurons in mammalian cortex?;A few spikes per second
What is the typical firing rate of neurons in mammalian cortex?;1-3 spikes per second
Replaces vague terms with a specific and quantifiable range for better precision.
How much information can a single neuron transmit per spike?;1-2 bits
How much information can a single neuron transmit per action potential?; 1-2 bits empirically
Uses the precise term "action potential".
What is the StarCraft processing speed?;10 bits/s at 1000 APM
What is the information rate of elite StarCraft players at 1000 APM (actions per minute)?;~10 bits/s
Moves context to the question for better alignment and easier memorization.
What is the maximum observed information rate during object recognition tasks?;30-50 bits/second
What is peak object recognition rate without motor output?;30-50 bits/s
Removes ambiguity and adds critical condition to the question for better context.
Examples of Atomizing and Deconstructing Cards:
		Initial Attempt:  According to cognitive psychology, how does expertise affect pattern recognition in data analysis? ; Through a larger repertoire of thinking frames   Checking: ✓ Tests fundamental principle ✗ Answer could be multiple things ✗ "Through" makes it opinion-like ✗ Not concrete enough
		Improved Version:  What specific cognitive difference explains why experts notice patterns that novices miss in data analysis? ; Larger repertoire of thinking frames  
		Further Improvement:  In data analysis, what tool do experts possess that enables them to notice patterns novices miss? ; Thinking frames  
		Initial Attempt:  What determines the degree of surprise from new information? ; Prior knowledge   Checking: ✓ Single fact ✓ Fundamental principle ✗ Too vague/general ✗ Not enough context ✗ Multiple possible answers
		Improved Version:  In cognitive science, what factor determines whether a piece of information produces surprise in an observer? ; Prior knowledge  

</rules>
`;
