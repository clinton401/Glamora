import { Button } from "./ui/button"

function SearchTypesButton({name}: {name: string}) {
  return (
      <Button className="w-full py-4 px-2 " variant="secondary">{name}</Button>
  )
}

export default SearchTypesButton
