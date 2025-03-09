import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  // Function to highlight numbers and important phrases
  const highlightText = (text: string) => {
    return text.split(' ').map((word, i) => {
      // Highlight numbers and specific phrases
      const shouldHighlight = (
        /\d+/.test(word) || // Numbers
        /%([\s!.,]|$)/.test(word) || // Percentages
        /(automated|automatic|instantly|real-time)/i.test(word) // Key words
      )
      
      return shouldHighlight ? (
        <span key={i} className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">
          {word}
        </span>
      ) : (
        <span key={i}> {word}</span>
      )
    })
  }
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none">
            {author.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-muted-foreground">
        {highlightText(text)}
      </p>
    </Card>
  )
}