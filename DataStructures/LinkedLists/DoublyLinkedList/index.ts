class DoublyListNode<T>
{
    value: T;
    next: DoublyListNode<T> | null = null;
    prev: DoublyListNode<T> | null = null;

    constructor(value: T)
    {
        this.value = value;
    }
}

class DoublyLinkedList<T>
{
    private head: DoublyListNode<T> | null = null;
    private tail: DoublyListNode<T> | null = null;

    addAtEnd(value: T): void
    {
        const n = new DoublyListNode(value);

        if (this.head === null)
        {
            this.head = n;
            this.tail = n;
        } else
        {
            n.prev = this.tail;
            this.tail!.next = n;
            this.tail = n;
        }
    }

    addAtBeginning(value: T): void
    {
        const n = new DoublyListNode(value);

        if (this.head === null)
        {
            this.head = n;
            this.tail = n;
        } else
        {
            n.next = this.head;
            this.head.prev = n;
            this.head = n;
        }
    }

    addAtPosition(value: T, position: number): void
    {
        if (position < 0) throw new Error('Position cannot be negative');

        if (position === 0)
        {
            this.addAtBeginning(value);
            return;
        }

        const n = new DoublyListNode(value);
        let current = this.head;
        let index = 0;

        while (current !== null && index < position)
        {
            current = current.next;
            index++;
        }

        if (current === null)
        {
            // Position is at or beyond the end
            this.addAtEnd(value);
        } else
        {
            // Insert before current
            n.next = current;
            n.prev = current.prev;
            if (current.prev !== null)
            {
                current.prev.next = n;
            }
            current.prev = n;
        }
    }

    contains(value: T): boolean
    {
        let n = this.head;

        while (n !== null && n.value !== value)
        {
            n = n.next;
        }

        return n !== null;
    }

    delete(value: T): boolean
    {
        let current = this.head;

        while (current !== null && current.value !== value)
        {
            current = current.next;
        }

        if (current === null)
        {
            return false;
        }

        // Update previous node's next pointer
        if (current.prev === null)
        {
            this.head = current.next;
        } else
        {
            current.prev.next = current.next;
        }

        // Update next node's prev pointer
        if (current.next === null)
        {
            this.tail = current.prev;
        } else
        {
            current.next.prev = current.prev;
        }

        return true;
    }

    toArray(): T[]
    {
        const values: T[] = [];
        let current = this.head;

        while (current !== null)
        {
            values.push(current.value);
            current = current.next;
        }

        return values;
    }

    // True reverse traversal using prev pointers
    toArrayReverse(): T[]
    {
        const values: T[] = [];
        let current = this.tail;

        while (current !== null)
        {
            values.push(current.value);
            current = current.prev;
        }

        return values;
    }

    getHead(): DoublyListNode<T> | null
    {
        return this.head;
    }

    getTail(): DoublyListNode<T> | null
    {
        return this.tail;
    }

    isEmpty(): boolean
    {
        return this.head === null;
    }

    clear(): void
    {
        this.head = null;
        this.tail = null;
    }

    size(): number
    {
        let count = 0;
        let current = this.head;
        while (current !== null)
        {
            count++;
            current = current.next;
        }
        return count;
    }
}

// Example usage:
const list = new DoublyLinkedList<number>();

for (let i = 1; i <= 5; i++)
{
    list.addAtEnd(i * 10);
}

list.addAtBeginning(5);
list.addAtPosition(25, 3);

console.log('List as array:', list.toArray());
console.log('Contains 25:', list.contains(25));
console.log('Contains 100:', list.contains(100));

list.delete(25);
console.log('After deleting 25:', list.toArray());
console.log('Contains 25:', list.contains(25));
console.log('List reversed:', list.toArrayReverse());