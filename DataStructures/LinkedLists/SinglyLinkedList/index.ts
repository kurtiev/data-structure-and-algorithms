class ListNode<T>
{
    value: T;
    next: ListNode<T> | null = null;

    constructor(value: T)
    {
        this.value = value;
    }
}

class LinkedList<T>
{
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;

    addAtEnd(value: T): void
    {
        const n = new ListNode(value);

        if (this.head === null)
        {
            this.head = n;
            this.tail = n;
        } else
        {
            this.tail!.next = n;
            this.tail = n;
        }
    }

    addAtBeginning(value: T): void
    {
        const n = new ListNode(value);

        if (this.head === null)
        {
            this.head = n;
            this.tail = n;
        } else
        {
            n.next = this.head;
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

        const n = new ListNode(value);
        let current = this.head;
        let previous: ListNode<T> | null = null;
        let index = 0;

        while (current !== null && index < position)
        {
            previous = current;
            current = current.next;
            index++;
        }

        if (previous !== null)
        {
            previous.next = n;
            n.next = current;

            if (n.next === null)
            {
                this.tail = n;
            }
        }
    }

    // search for a value
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
        let previous: ListNode<T> | null = null;

        while (current !== null && current.value !== value)
        {
            previous = current;
            current = current.next;
        }

        if (current === null)
        {
            return false;
        }

        if (previous === null)
        {
            this.head = current.next;
            if (this.head === null)
            {
                this.tail = null;
            }
        } else
        {
            previous.next = current.next;
            if (previous.next === null)
            {
                this.tail = previous;
            }
        }

        return true;
    }

    // traverse the list and return an array of values
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

    // traverse in reverse order and return an array of values
    toArrayReverse(): T[]
    {
        const result: T[] = [];
        let current = this.head;
        while (current !== null)
        {
            result.push(current.value);
            current = current.next;
        }
        return result.reverse();
    }

    getHead(): ListNode<T> | null
    {
        return this.head;
    }

    getTail(): ListNode<T> | null
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
const list = new LinkedList<number>();

for (let i = 1; i <= 5; i++)
{
    list.addAtEnd(i * 10);
}

list.addAtBeginning(5); // List: 5 -> 10 -> 20 -> 30 -> 40 -> 50
list.addAtPosition(25, 3); // List: 5 -> 10 -> 20 -> 25 -> 30 -> 40 -> 50

console.log(JSON.stringify(list));

console.log('==>> contains 25: ', list.contains(25)); // true
console.log('==>> contains 100: ', list.contains(100)); // false

list.delete(25); // List: 5 -> 10 -> 20 -> 30 -> 40 -> 50

const isRemoved = list.contains(25) === false;

console.log('==>> isRemoved: ', isRemoved); // false

if (isRemoved)
{
    console.log('25 was removed correctly.');
}

console.log('==>> contains 25: ', list.contains(25)); // false

console.log(
    'List as array: ',
    list.toArray(),
);

console.log(
    'List as array (reverse): ',
    list.toArrayReverse(),
);

console.log(JSON.stringify(list));
