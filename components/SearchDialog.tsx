import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { MenuCategory, MenuItem } from "@/types/menuTypes";
import { useBasket } from "@/components/BasketContext";

interface SearchDialogProps {
  menuItems: MenuCategory[];
}

export function SearchDialog({ menuItems }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToBasket } = useBasket();

  const handleSelect = (item: MenuItem) => {
    addToBasket(item);
    setOpen(false);
  };

  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <span key={i} className="bg-yellow-200 text-black">{part}</span> : part
    );
  };

  const searchItems = (items: MenuItem[]) => {
    return items.filter(item => {
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-muted-foreground">
          <Search className="mr-2 h-4 w-4" />
          Search menu...
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Menu</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput 
            placeholder="Search for dishes..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {menuItems.map((category) => {
              const searchResults = searchItems(category.items);
              if (searchResults.length === 0) return null;

              return (
                <CommandGroup key={category.name} heading={category.name}>
                  {searchResults.map((item: MenuItem) => (
                    <CommandItem
                      key={item.name}
                      onSelect={() => handleSelect(item)}
                      className="flex justify-between items-start py-3 hover:bg-accent"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{highlightMatch(item.name)}</span>
                          {item.spiceLevel && (
                            <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full">
                              {item.spiceLevel}
                            </span>
                          )}
                          {item.dietary?.map((diet) => (
                            <span key={diet} className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded-full">
                              {diet}
                            </span>
                          ))}
                        </div>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {highlightMatch(item.description)}
                          </p>
                        )}
                      </div>
                      <span className="text-muted-foreground font-medium ml-4">
                        £{item.price?.toFixed(2)}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}