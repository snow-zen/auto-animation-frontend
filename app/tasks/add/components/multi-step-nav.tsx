import { Circle, CircleCheckBig } from "lucide-react"

interface MultiStepNavProps {
  currentStepIndex: number
  steps: {
    title: string
    type: string
  }[]
}

export function MultiStepNav({ currentStepIndex, steps }: MultiStepNavProps) {
  return (
    <div className="absolute -top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
      <nav className="py-5 h-full rounded-md">
        <ul className="flex justify-center gap-2 md:flex-col">
          {steps.map((it, idx) => (
            <li key={it.type} className="flex items-center font-medium pb-1.5">
              {currentStepIndex > idx ? (
                <CircleCheckBig className="mr-2 h-4 w-4 text-sm text-green-500" />
              ) : (
                <Circle className="mr-2 h-4 w-4 text-sm text-neutral-500" />
              )}
              <span className={`text-sm ${currentStepIndex === idx ? "text-black" : "text-neutral-500"} md:text-base`}>
                {it.title}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
