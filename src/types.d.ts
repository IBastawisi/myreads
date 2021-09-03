interface book {
	allowAnonLogging: boolean
	authors: string[]
	averageRating: number
	canonicalVolumeLink: string
	categories: string[]
	contentVersion: string
	description: string
	id: string
	imageLinks: { smallThumbnail: string, thumbnail: string }
	industryIdentifiers: { type: string, identifier: string }[]
	infoLink: string
	language: string
	maturityRating: string
	pageCount: number
	panelizationSummary: { containsEpubBubbles: boolean, containsImageBubbles: boolean }
	previewLink: string
	printType: string
	publishedDate: string
	publisher: string
	ratingsCount: number
	readingModes: { text: boolean, image: boolean }
	shelf: shelf
	subtitle: string
	title: string
}

type shelf = "wantToRead" | "currentlyReading" | "read"