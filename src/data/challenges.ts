import { CodingChallenge } from '../types';

export const CODING_CHALLENGES: CodingChallenge[] = [
  // MODULE 1: Classes & Objects
  {
    id: 'co-easy',
    moduleId: 'classes-objects',
    difficulty: 'easy',
    title: 'Create a Pet Class',
    description: 'Create a `Pet` class with attributes `name`, `species`, and `age`. Add a `describe()` method that prints the pet\'s details. Create 2 pet objects and call `describe()` on each.',
    expectedBehavior: 'Two Pet objects created and described. Output should include name, species, and age for each pet.',
    hints: [
      'Use __init__ to set up the three attributes',
      'The describe() method uses self to access attributes',
      'Create objects like: p1 = Pet("Fluffy", "cat", 3)',
    ],
    starterCode: `class Pet:
    """A class representing a pet."""

    def __init__(self, name, species, age):
        # Set up your attributes here
        pass

    def describe(self):
        # Print the pet's details here
        pass

# Create your two pet objects here
`,
    sampleSolution: `class Pet:
    """A class representing a pet."""

    def __init__(self, name, species, age):
        self.name = name
        self.species = species
        self.age = age

    def describe(self):
        print(f"Name: {self.name}, Species: {self.species}, Age: {self.age}")

p1 = Pet("Fluffy", "cat", 3)
p2 = Pet("Rex", "dog", 5)
p1.describe()
p2.describe()
`,
    xpReward: 30,
    exampleTitle: 'Car Class',
    exampleCode: `class Car:
    """A class representing a car."""

    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def describe(self):
        print(f"--- {self.year} {self.make} {self.model} ---")
        print(f"  Make:  {self.make}")
        print(f"  Model: {self.model}")
        print(f"  Year:  {self.year}")

# Create two Car objects and call describe() on each
car1 = Car("Toyota", "Camry", 2022)
car2 = Car("Honda", "Civic", 2019)

car1.describe()
print()
car2.describe()
`,
  },
  {
    id: 'co-medium',
    moduleId: 'classes-objects',
    difficulty: 'medium',
    title: 'Build a Playlist Manager',
    description: 'Create a `Playlist` class with attributes `name` and `songs` (empty list). Add methods: `add_song(song)`, `remove_song(song)`, `display()`, and `song_count()`. Create a playlist, add 5 songs, remove 1, then display the result.',
    expectedBehavior: 'Playlist with 4 songs displayed after adding 5 and removing 1. song_count() returns correct count.',
    hints: [
      'Initialise songs as an empty list in __init__',
      'Use list.append() to add, list.remove() to remove',
      'song_count() should return len(self.songs)',
    ],
    starterCode: `class Playlist:
    """A music playlist manager."""

    def __init__(self, name):
        self.name = name
        # Initialise songs as an empty list

    def add_song(self, song):
        pass

    def remove_song(self, song):
        pass

    def display(self):
        pass

    def song_count(self):
        pass

# Create a playlist and test it
`,
    sampleSolution: `class Playlist:
    """A music playlist manager."""

    def __init__(self, name):
        self.name = name
        self.songs = []

    def add_song(self, song):
        self.songs.append(song)
        print(f"Added: {song}")

    def remove_song(self, song):
        if song in self.songs:
            self.songs.remove(song)
            print(f"Removed: {song}")
        else:
            print(f"{song} not found in playlist")

    def display(self):
        print(f"Playlist: {self.name} ({self.song_count()} songs)")
        for i, song in enumerate(self.songs, 1):
            print(f"  {i}. {song}")

    def song_count(self):
        return len(self.songs)

my_playlist = Playlist("Chill Vibes")
my_playlist.add_song("Blinding Lights")
my_playlist.add_song("Levitating")
my_playlist.add_song("Watermelon Sugar")
my_playlist.add_song("Stay")
my_playlist.add_song("Peaches")
my_playlist.remove_song("Stay")
my_playlist.display()
print(f"Total songs: {my_playlist.song_count()}")
`,
    xpReward: 50,
    exampleTitle: 'Shopping Cart',
    exampleCode: `class ShoppingCart:
    """A shopping cart manager."""

    def __init__(self, customer):
        self.customer = customer
        self.items = []

    def add_item(self, item):
        self.items.append(item)
        print(f"Added: {item}")

    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)
            print(f"Removed: {item}")
        else:
            print(f"{item} not in cart")

    def display(self):
        print(f"\\n{self.customer}'s Cart ({self.item_count()} items):")
        for i, item in enumerate(self.items, 1):
            print(f"  {i}. {item}")

    def item_count(self):
        return len(self.items)

cart = ShoppingCart("Alex")
cart.add_item("Laptop")
cart.add_item("Mouse")
cart.add_item("Keyboard")
cart.add_item("USB Hub")
cart.add_item("Monitor")
cart.remove_item("USB Hub")
cart.display()
print(f"Total items: {cart.item_count()}")
`,
  },
  {
    id: 'co-hard',
    moduleId: 'classes-objects',
    difficulty: 'hard',
    title: 'Classroom Manager',
    description: 'Create a `Student` class (name, student_id, score). Create a `Classroom` class that manages a list of Student objects. Include methods: `add_student()`, `remove_student(name)`, `find_student(name)`, `get_average_score()`, and `get_top_student()`. Demonstrate with at least 4 students.',
    expectedBehavior: 'Classroom managing multiple Student objects, showing average score and top student.',
    hints: [
      'Classroom stores a list of Student objects',
      'get_average_score() sums all scores and divides by count',
      'get_top_student() uses max() with a key function',
    ],
    starterCode: `class Student:
    """Represents a student."""
    def __init__(self, name, student_id, score):
        pass

class Classroom:
    """Manages a collection of students."""
    def __init__(self, class_name):
        pass

    def add_student(self, student):
        pass

    def remove_student(self, name):
        pass

    def find_student(self, name):
        pass

    def get_average_score(self):
        pass

    def get_top_student(self):
        pass

# Create your classroom with 4+ students here
`,
    sampleSolution: `class Student:
    def __init__(self, name, student_id, score):
        self.name = name
        self.student_id = student_id
        self.score = score

    def __str__(self):
        return f"{self.name} (ID: {self.student_id}, Score: {self.score})"

class Classroom:
    def __init__(self, class_name):
        self.class_name = class_name
        self.students = []

    def add_student(self, student):
        self.students.append(student)
        print(f"Added {student.name} to {self.class_name}")

    def remove_student(self, name):
        for s in self.students:
            if s.name == name:
                self.students.remove(s)
                print(f"Removed {name}")
                return
        print(f"{name} not found")

    def find_student(self, name):
        for s in self.students:
            if s.name == name:
                return s
        return None

    def get_average_score(self):
        if not self.students:
            return 0
        return sum(s.score for s in self.students) / len(self.students)

    def get_top_student(self):
        if not self.students:
            return None
        return max(self.students, key=lambda s: s.score)

classroom = Classroom("VCE Software Development")
classroom.add_student(Student("Aisha", "STU001", 88))
classroom.add_student(Student("Liam", "STU002", 92))
classroom.add_student(Student("Mei", "STU003", 75))
classroom.add_student(Student("Jordan", "STU004", 95))
print(f"Average score: {classroom.get_average_score():.1f}")
top = classroom.get_top_student()
print(f"Top student: {top}")
`,
    xpReward: 80,
    exampleTitle: 'Library System',
    exampleCode: `class Book:
    """Represents a library book."""
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn

    def __str__(self):
        return f'"{self.title}" by {self.author}'

class Library:
    """Manages a collection of books."""
    def __init__(self, name):
        self.name = name
        self.books = []

    def add_book(self, book):
        self.books.append(book)
        print(f"Added: {book}")

    def remove_book(self, title):
        for b in self.books:
            if b.title == title:
                self.books.remove(b)
                print(f'Removed: "{title}"')
                return
        print(f'"{title}" not found')

    def find_book(self, title):
        for b in self.books:
            if b.title == title:
                return b
        return None

    def get_book_count(self):
        return len(self.books)

    def get_by_author(self, author):
        return [b for b in self.books if b.author == author]

lib = Library("City Library")
lib.add_book(Book("Python Crash Course", "Eric Matthes", "978-1"))
lib.add_book(Book("Clean Code", "Robert Martin", "978-2"))
lib.add_book(Book("Fluent Python", "Luciano Ramalho", "978-3"))
lib.add_book(Book("The Pragmatic Programmer", "Eric Matthes", "978-4"))
lib.remove_book("Clean Code")
found = lib.find_book("Fluent Python")
print(f"\\nFound: {found}")
print(f"Total books: {lib.get_book_count()}")
by_eric = lib.get_by_author("Eric Matthes")
print(f"Books by Eric Matthes: {len(by_eric)}")
`,
  },

  // MODULE 2: Attributes & Methods
  {
    id: 'am-easy',
    moduleId: 'attributes-methods',
    difficulty: 'easy',
    title: 'Build a Temperature Converter',
    description: 'Create a `Temperature` class with a `celsius` attribute. Add methods `to_fahrenheit()` and `to_kelvin()` that return the converted values, and a `display()` method that prints all three values.',
    expectedBehavior: 'Temperature object stores a celsius value and correctly converts to Fahrenheit and Kelvin. display() prints all three values.',
    hints: [
      'Fahrenheit formula: (celsius * 9/5) + 32',
      'Kelvin formula: celsius + 273.15',
      'display() calls the other two methods to get the values',
    ],
    starterCode: `class Temperature:
    """Stores a temperature and can convert between units."""

    def __init__(self, celsius):
        self.celsius = celsius  # Attribute: temperature in Celsius

    def to_fahrenheit(self):
        # Return the temperature converted to Fahrenheit
        pass

    def to_kelvin(self):
        # Return the temperature converted to Kelvin
        pass

    def display(self):
        # Print all three values
        pass

# Test your class
t = Temperature(100)
t.display()

t2 = Temperature(0)
t2.display()
`,
    sampleSolution: `class Temperature:
    """Stores a temperature and can convert between units."""

    def __init__(self, celsius):
        self.celsius = celsius

    def to_fahrenheit(self):
        return (self.celsius * 9/5) + 32

    def to_kelvin(self):
        return self.celsius + 273.15

    def display(self):
        print(f"Celsius:    {self.celsius}°C")
        print(f"Fahrenheit: {self.to_fahrenheit():.2f}°F")
        print(f"Kelvin:     {self.to_kelvin():.2f}K")

t = Temperature(100)
t.display()
print()
t2 = Temperature(0)
t2.display()
`,
    xpReward: 30,
    exampleTitle: 'Rectangle Dimensions',
    exampleCode: `class Rectangle:
    """Stores dimensions and calculates properties."""

    def __init__(self, width, height):
        self.width = width    # Attribute
        self.height = height  # Attribute

    def calculate_area(self):
        return self.width * self.height

    def calculate_perimeter(self):
        return 2 * (self.width + self.height)

    def is_square(self):
        return self.width == self.height

    def display(self):
        print(f"Width:     {self.width}")
        print(f"Height:    {self.height}")
        print(f"Area:      {self.calculate_area()}")
        print(f"Perimeter: {self.calculate_perimeter()}")
        print(f"Is square: {self.is_square()}")

r1 = Rectangle(5, 3)
r1.display()
print()
r2 = Rectangle(4, 4)
r2.display()
`,
  },
  {
    id: 'am-medium',
    moduleId: 'attributes-methods',
    difficulty: 'medium',
    title: 'Student Grade Tracker',
    description: 'Create a `Student` class with attributes `name`, `student_id`, and `grades` (empty list). Add methods: `add_grade(subject, score)` that stores `{subject: score}` entries, `get_average()` that returns the average score, `get_highest()` and `get_lowest()` that return the subject and score for the best and worst results, and `display_report()` that prints a full report.',
    expectedBehavior: 'Student object tracks grades per subject. Average, highest and lowest are calculated correctly. Report displays all information.',
    hints: [
      'Store grades as a list of dictionaries: {"subject": subject, "score": score}',
      'get_average() sums all scores and divides by the count',
      'get_highest() uses max() with a key on the score field',
    ],
    starterCode: `class Student:
    """Tracks a student's grades across subjects."""

    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []  # List of {"subject": ..., "score": ...}

    def add_grade(self, subject, score):
        pass

    def get_average(self):
        pass

    def get_highest(self):
        pass

    def get_lowest(self):
        pass

    def display_report(self):
        pass

# Test your class
s = Student("Aisha Rahman", "STU042")
s.add_grade("Software Development", 88)
s.add_grade("Further Maths", 74)
s.add_grade("English", 82)
s.add_grade("Chemistry", 91)
s.display_report()
`,
    sampleSolution: `class Student:
    """Tracks a student's grades across subjects."""

    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []

    def add_grade(self, subject, score):
        self.grades.append({"subject": subject, "score": score})
        print(f"Added: {subject} — {score}%")

    def get_average(self):
        if not self.grades:
            return 0
        return sum(g["score"] for g in self.grades) / len(self.grades)

    def get_highest(self):
        if not self.grades:
            return None
        return max(self.grades, key=lambda g: g["score"])

    def get_lowest(self):
        if not self.grades:
            return None
        return min(self.grades, key=lambda g: g["score"])

    def display_report(self):
        print(f"\\n=== Report for {self.name} ({self.student_id}) ===")
        for g in self.grades:
            print(f"  {g['subject']}: {g['score']}%")
        print(f"Average:  {self.get_average():.1f}%")
        high = self.get_highest()
        low  = self.get_lowest()
        print(f"Highest:  {high['subject']} ({high['score']}%)")
        print(f"Lowest:   {low['subject']} ({low['score']}%)")

s = Student("Aisha Rahman", "STU042")
s.add_grade("Software Development", 88)
s.add_grade("Further Maths", 74)
s.add_grade("English", 82)
s.add_grade("Chemistry", 91)
s.display_report()
`,
    xpReward: 50,
    exampleTitle: 'Fitness Tracker',
    exampleCode: `class FitnessTracker:
    """Tracks daily steps and calculates stats."""

    def __init__(self, user_name, goal=10000):
        self.user_name = user_name
        self.goal = goal
        self.daily_steps = []

    def log_steps(self, day, steps):
        self.daily_steps.append({"day": day, "steps": steps})
        print(f"{day}: {steps:,} steps logged")

    def get_average(self):
        if not self.daily_steps:
            return 0
        return sum(d["steps"] for d in self.daily_steps) / len(self.daily_steps)

    def get_best_day(self):
        if not self.daily_steps:
            return None
        return max(self.daily_steps, key=lambda d: d["steps"])

    def days_goal_met(self):
        return sum(1 for d in self.daily_steps if d["steps"] >= self.goal)

    def display_summary(self):
        print(f"\\n=== {self.user_name}'s Weekly Summary ===")
        for d in self.daily_steps:
            met = "✓" if d["steps"] >= self.goal else "✗"
            print(f"  {d['day']}: {d['steps']:,} steps {met}")
        best = self.get_best_day()
        print(f"Average:       {self.get_average():,.0f} steps/day")
        print(f"Best day:      {best['day']} ({best['steps']:,} steps)")
        print(f"Goal met:      {self.days_goal_met()}/{len(self.daily_steps)} days")

tracker = FitnessTracker("Jordan", goal=8000)
tracker.log_steps("Monday", 9500)
tracker.log_steps("Tuesday", 6200)
tracker.log_steps("Wednesday", 11300)
tracker.log_steps("Thursday", 7800)
tracker.log_steps("Friday", 12100)
tracker.display_summary()
`,
  },
  {
    id: 'am-hard',
    moduleId: 'attributes-methods',
    difficulty: 'hard',
    title: 'Inventory Management System',
    description: 'Create a `Product` class (name, sku, price, quantity). Create an `Inventory` class that manages a list of Product objects. Include methods: `add_product(product)`, `remove_product(sku)`, `find_product(sku)`, `update_quantity(sku, amount)`, `get_total_value()` (sum of price * quantity for all products), `get_low_stock(threshold)` returning products below threshold, and `display_inventory()`.',
    expectedBehavior: 'Inventory correctly manages products. Total value, low stock alerts, and full display work accurately.',
    hints: [
      'Product has its own attributes; Inventory holds a list of Product objects',
      'get_total_value() loops through all products and sums price * quantity',
      'find_product() searches by sku and returns the matching Product or None',
    ],
    starterCode: `class Product:
    """Represents a single product in the inventory."""
    def __init__(self, name, sku, price, quantity):
        self.name = name
        self.sku = sku
        self.price = price
        self.quantity = quantity

class Inventory:
    """Manages a collection of products."""
    def __init__(self, store_name):
        self.store_name = store_name
        self.products = []

    def add_product(self, product):
        pass

    def remove_product(self, sku):
        pass

    def find_product(self, sku):
        pass

    def update_quantity(self, sku, amount):
        pass

    def get_total_value(self):
        pass

    def get_low_stock(self, threshold):
        pass

    def display_inventory(self):
        pass

# Test your implementation
inv = Inventory("Tech Store")
inv.add_product(Product("Laptop", "TECH-001", 1299.99, 5))
inv.add_product(Product("Mouse", "TECH-002", 29.99, 50))
inv.add_product(Product("Keyboard", "TECH-003", 79.99, 3))
inv.add_product(Product("Monitor", "TECH-004", 449.99, 8))
inv.update_quantity("TECH-001", -2)
print(f"Total value: \${inv.get_total_value():,.2f}")
low = inv.get_low_stock(5)
print(f"Low stock items: {[p.name for p in low]}")
inv.display_inventory()
`,
    sampleSolution: `class Product:
    """Represents a single product in the inventory."""
    def __init__(self, name, sku, price, quantity):
        self.name = name
        self.sku = sku
        self.price = price
        self.quantity = quantity

class Inventory:
    """Manages a collection of products."""
    def __init__(self, store_name):
        self.store_name = store_name
        self.products = []

    def add_product(self, product):
        self.products.append(product)
        print(f"Added: {product.name} ({product.sku})")

    def remove_product(self, sku):
        for p in self.products:
            if p.sku == sku:
                self.products.remove(p)
                print(f"Removed: {p.name}")
                return True
        print(f"SKU not found: {sku}")
        return False

    def find_product(self, sku):
        for p in self.products:
            if p.sku == sku:
                return p
        return None

    def update_quantity(self, sku, amount):
        product = self.find_product(sku)
        if product:
            product.quantity = max(0, product.quantity + amount)
            print(f"Updated {product.name}: qty now {product.quantity}")
        else:
            print(f"SKU not found: {sku}")

    def get_total_value(self):
        return sum(p.price * p.quantity for p in self.products)

    def get_low_stock(self, threshold):
        return [p for p in self.products if p.quantity <= threshold]

    def display_inventory(self):
        print(f"\\n=== {self.store_name} Inventory ===")
        print(f"{'Product':<20} {'SKU':<12} {'Price':>8} {'Qty':>5} {'Value':>10}")
        print("-" * 60)
        for p in self.products:
            value = p.price * p.quantity
            print(f"{p.name:<20} {p.sku:<12} \${p.price:>7.2f} {p.quantity:>5} \${value:>9.2f}")
        print("-" * 60)
        print(f"Total inventory value: \${self.get_total_value():,.2f}")

inv = Inventory("Tech Store")
inv.add_product(Product("Laptop", "TECH-001", 1299.99, 5))
inv.add_product(Product("Mouse", "TECH-002", 29.99, 50))
inv.add_product(Product("Keyboard", "TECH-003", 79.99, 3))
inv.add_product(Product("Monitor", "TECH-004", 449.99, 8))
inv.update_quantity("TECH-001", -2)
print(f"Total value: \${inv.get_total_value():,.2f}")
low = inv.get_low_stock(5)
print(f"Low stock items: {[p.name for p in low]}")
inv.display_inventory()
`,
    xpReward: 80,
    exampleTitle: 'Contact Book',
    exampleCode: `class Contact:
    """Stores details for a single contact."""
    def __init__(self, name, phone, email):
        self.name = name
        self.phone = phone
        self.email = email

class ContactBook:
    """Manages a collection of contacts."""
    def __init__(self, owner):
        self.owner = owner
        self.contacts = []

    def add_contact(self, contact):
        self.contacts.append(contact)
        print(f"Added contact: {contact.name}")

    def remove_contact(self, name):
        for c in self.contacts:
            if c.name.lower() == name.lower():
                self.contacts.remove(c)
                print(f"Removed: {name}")
                return True
        print(f"{name} not found")
        return False

    def find_contact(self, name):
        for c in self.contacts:
            if c.name.lower() == name.lower():
                return c
        return None

    def search_by_email(self, domain):
        return [c for c in self.contacts if domain in c.email]

    def get_contact_count(self):
        return len(self.contacts)

    def display_all(self):
        print(f"\\n=== {self.owner}'s Contact Book ({self.get_contact_count()} contacts) ===")
        for c in self.contacts:
            print(f"  {c.name:<20} {c.phone:<15} {c.email}")

book = ContactBook("Aisha")
book.add_contact(Contact("Liam Chen", "0411 111 111", "liam@gmail.com"))
book.add_contact(Contact("Mei Wong", "0422 222 222", "mei@school.edu.au"))
book.add_contact(Contact("Jordan Park", "0433 333 333", "jordan@gmail.com"))
book.remove_contact("Liam Chen")
found = book.find_contact("Mei Wong")
print(f"Found: {found.name} — {found.phone}")
edu_contacts = book.search_by_email("edu.au")
print(f"School contacts: {[c.name for c in edu_contacts]}")
book.display_all()
`,
  },

  // MODULE 3: Constructors
  {
    id: 'con-easy',
    moduleId: 'constructors',
    difficulty: 'easy',
    title: 'Game Character Creator',
    description: 'Create a `GameCharacter` class with a constructor that takes `name` and `character_class` as required parameters, and `health`, `level`, and `score` as optional parameters (defaults: 100, 1, 0). Add a `display_stats()` method that prints all attributes.',
    expectedBehavior: 'Characters created with and without optional parameters. Default values applied correctly. display_stats() shows all attributes.',
    hints: [
      'Optional parameters have default values: def __init__(self, name, char_class, health=100, level=1, score=0)',
      'All five attributes should be set in __init__',
      'display_stats() accesses attributes using self',
    ],
    starterCode: `class GameCharacter:
    """A game character with required and optional constructor parameters."""

    def __init__(self, name, character_class, health=100, level=1, score=0):
        # Set up all five attributes here
        pass

    def display_stats(self):
        # Print all attributes
        pass

# Test with default values
hero1 = GameCharacter("Aisha", "Mage")

# Test with custom values
hero2 = GameCharacter("Liam", "Warrior", health=150, level=5, score=2000)

hero1.display_stats()
print()
hero2.display_stats()
`,
    sampleSolution: `class GameCharacter:
    """A game character with required and optional constructor parameters."""

    def __init__(self, name, character_class, health=100, level=1, score=0):
        self.name = name
        self.character_class = character_class
        self.health = health
        self.level = level
        self.score = score

    def display_stats(self):
        print(f"=== {self.name} ===")
        print(f"Class:  {self.character_class}")
        print(f"Health: {self.health}")
        print(f"Level:  {self.level}")
        print(f"Score:  {self.score}")

hero1 = GameCharacter("Aisha", "Mage")
hero2 = GameCharacter("Liam", "Warrior", health=150, level=5, score=2000)

hero1.display_stats()
print()
hero2.display_stats()
`,
    xpReward: 30,
    exampleTitle: 'Coffee Order',
    exampleCode: `class CoffeeOrder:
    """Represents a coffee order with defaults for common options."""

    def __init__(self, customer, drink, size="medium", milk="full cream", sugar=0):
        self.customer = customer
        self.drink = drink
        self.size = size
        self.milk = milk
        self.sugar = sugar
        self.is_ready = False  # Always starts False

    def mark_ready(self):
        self.is_ready = True
        print(f"{self.customer}'s {self.drink} is ready!")

    def display_order(self):
        print(f"Order for: {self.customer}")
        print(f"  Drink:  {self.size} {self.drink}")
        print(f"  Milk:   {self.milk}")
        print(f"  Sugar:  {self.sugar} {'tsp' if self.sugar != 1 else 'tsp'}")
        print(f"  Ready:  {self.is_ready}")

# Default milk and sugar
order1 = CoffeeOrder("Jordan", "Flat White")

# Custom everything
order2 = CoffeeOrder("Mei", "Cappuccino", size="large", milk="oat", sugar=2)

order1.display_order()
print()
order2.display_order()
order2.mark_ready()
`,
  },
  {
    id: 'con-medium',
    moduleId: 'constructors',
    difficulty: 'medium',
    title: 'Vehicle Registration System',
    description: 'Create a `Vehicle` class whose constructor accepts `make`, `model`, `year`, and `owner`. The constructor should also automatically generate a `registration_id` (format: first 3 letters of make + last 2 digits of year + unique number, e.g. "TOY231"), set `is_registered` to True, and record `registration_date` as "2025-01-01". Add `renew_registration()` and `transfer_ownership(new_owner)` methods, and a `display_registration()` method.',
    expectedBehavior: 'Vehicles created with auto-generated registration IDs. Ownership transfer and renewal work correctly.',
    hints: [
      'Use a class variable (counter = 0) to generate unique numbers',
      'Registration ID: make[:3].upper() + str(year)[-2:] + str(counter)',
      'transfer_ownership() updates self.owner',
    ],
    starterCode: `class Vehicle:
    """Vehicle registration with auto-generated ID."""

    registration_count = 0  # Class variable for unique IDs

    def __init__(self, make, model, year, owner):
        self.make = make
        self.model = model
        self.year = year
        self.owner = owner
        # Auto-generate the registration_id here
        # Set is_registered = True
        # Set registration_date = "2025-01-01"
        pass

    def renew_registration(self, new_date):
        pass

    def transfer_ownership(self, new_owner):
        pass

    def display_registration(self):
        pass

# Test
v1 = Vehicle("Toyota", "Camry", 2023, "Aisha")
v2 = Vehicle("Honda", "Civic", 2022, "Liam")
v1.display_registration()
v2.display_registration()
v1.transfer_ownership("Mei")
v1.display_registration()
`,
    sampleSolution: `class Vehicle:
    """Vehicle registration with auto-generated ID."""

    registration_count = 0

    def __init__(self, make, model, year, owner):
        self.make = make
        self.model = model
        self.year = year
        self.owner = owner
        Vehicle.registration_count += 1
        self.registration_id = (
            make[:3].upper() + str(year)[-2:] + str(Vehicle.registration_count)
        )
        self.is_registered = True
        self.registration_date = "2025-01-01"

    def renew_registration(self, new_date):
        self.registration_date = new_date
        self.is_registered = True
        print(f"{self.registration_id} renewed until {new_date}")

    def transfer_ownership(self, new_owner):
        old = self.owner
        self.owner = new_owner
        print(f"{self.registration_id} transferred from {old} to {new_owner}")

    def display_registration(self):
        status = "Registered" if self.is_registered else "Unregistered"
        print(f"--- {self.make} {self.model} ({self.year}) ---")
        print(f"  Reg ID:   {self.registration_id}")
        print(f"  Owner:    {self.owner}")
        print(f"  Status:   {status}")
        print(f"  Reg Date: {self.registration_date}")

v1 = Vehicle("Toyota", "Camry", 2023, "Aisha")
v2 = Vehicle("Honda", "Civic", 2022, "Liam")
v1.display_registration()
print()
v2.display_registration()
print()
v1.transfer_ownership("Mei")
v1.display_registration()
`,
    xpReward: 50,
    exampleTitle: 'Library Book',
    exampleCode: `class LibraryBook:
    """A library book with auto-assigned accession number."""

    _next_accession = 1000  # Class variable

    def __init__(self, title, author, genre, pages):
        self.title = title
        self.author = author
        self.genre = genre
        self.pages = pages
        # Auto-assigned on creation
        self.accession_number = f"LIB-{LibraryBook._next_accession}"
        LibraryBook._next_accession += 1
        self.is_available = True
        self.borrower = None
        self.times_borrowed = 0

    def borrow(self, borrower_name):
        if self.is_available:
            self.borrower = borrower_name
            self.is_available = False
            self.times_borrowed += 1
            print(f'"{self.title}" borrowed by {borrower_name}')
        else:
            print(f'"{self.title}" is currently unavailable')

    def return_book(self):
        if not self.is_available:
            print(f'"{self.title}" returned by {self.borrower}')
            self.borrower = None
            self.is_available = True

    def display_info(self):
        status = "Available" if self.is_available else f"Borrowed by {self.borrower}"
        print(f"{self.accession_number}: \\"{self.title}\\" by {self.author}")
        print(f"  Genre: {self.genre} | Pages: {self.pages} | Times borrowed: {self.times_borrowed}")
        print(f"  Status: {status}")

b1 = LibraryBook("Python Crash Course", "Eric Matthes", "Programming", 544)
b2 = LibraryBook("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", 180)
b1.display_info()
b2.display_info()
b1.borrow("Aisha")
b1.display_info()
b1.return_book()
`,
  },
  {
    id: 'con-hard',
    moduleId: 'constructors',
    difficulty: 'hard',
    title: 'School Timetable Builder',
    description: 'Create a `TimeSlot` class (day, start_time, end_time, room). Create a `Subject` class with a constructor that takes name, teacher, and year_level. The constructor should initialise an empty timetable list and an empty enrolled_students list. Add methods: `add_timeslot(timeslot)`, `enrol_student(name)`, `remove_student(name)`, `get_schedule()` that returns formatted schedule text, and `display_subject_info()`. Demonstrate with at least 2 subjects and 3 timeslots each.',
    expectedBehavior: 'Subjects hold TimeSlot objects. Students enrolled correctly. Schedule displays formatted timetable with all timeslots.',
    hints: [
      'TimeSlot is a simple data class — no complex methods needed',
      'Subject.timetable stores TimeSlot objects',
      'get_schedule() loops through self.timetable and formats each slot',
    ],
    starterCode: `class TimeSlot:
    """Represents a single scheduled period."""
    def __init__(self, day, start_time, end_time, room):
        pass

class Subject:
    """Represents a school subject with schedule and enrolments."""
    def __init__(self, name, teacher, year_level):
        # Initialise name, teacher, year_level
        # Initialise empty timetable list
        # Initialise empty enrolled_students list
        pass

    def add_timeslot(self, timeslot):
        pass

    def enrol_student(self, name):
        pass

    def remove_student(self, name):
        pass

    def get_schedule(self):
        pass

    def display_subject_info(self):
        pass

# Create two subjects and demonstrate
`,
    sampleSolution: `class TimeSlot:
    """Represents a single scheduled period."""
    def __init__(self, day, start_time, end_time, room):
        self.day = day
        self.start_time = start_time
        self.end_time = end_time
        self.room = room

class Subject:
    """Represents a school subject with schedule and enrolments."""
    def __init__(self, name, teacher, year_level):
        self.name = name
        self.teacher = teacher
        self.year_level = year_level
        self.timetable = []
        self.enrolled_students = []

    def add_timeslot(self, timeslot):
        self.timetable.append(timeslot)
        print(f"Added: {timeslot.day} {timeslot.start_time}–{timeslot.end_time} in {timeslot.room}")

    def enrol_student(self, name):
        if name not in self.enrolled_students:
            self.enrolled_students.append(name)
            print(f"{name} enrolled in {self.name}")
        else:
            print(f"{name} is already enrolled")

    def remove_student(self, name):
        if name in self.enrolled_students:
            self.enrolled_students.remove(name)
            print(f"{name} removed from {self.name}")
        else:
            print(f"{name} not found in {self.name}")

    def get_schedule(self):
        if not self.timetable:
            return "No timeslots scheduled"
        lines = []
        for slot in self.timetable:
            lines.append(f"  {slot.day:<12} {slot.start_time}–{slot.end_time}  Room: {slot.room}")
        return "\\n".join(lines)

    def display_subject_info(self):
        print(f"\\n=== {self.name} (Year {self.year_level}) ===")
        print(f"Teacher: {self.teacher}")
        print(f"Enrolled ({len(self.enrolled_students)}): {', '.join(self.enrolled_students) if self.enrolled_students else 'None'}")
        print(f"Schedule:\\n{self.get_schedule()}")

softdev = Subject("Software Development", "Ms Wong", 12)
softdev.add_timeslot(TimeSlot("Monday", "9:00", "10:00", "B12"))
softdev.add_timeslot(TimeSlot("Wednesday", "11:00", "12:00", "B12"))
softdev.add_timeslot(TimeSlot("Friday", "14:00", "15:00", "B14"))
softdev.enrol_student("Aisha")
softdev.enrol_student("Liam")
softdev.enrol_student("Mei")

maths = Subject("Further Maths", "Mr Patel", 12)
maths.add_timeslot(TimeSlot("Tuesday", "9:00", "10:00", "A03"))
maths.add_timeslot(TimeSlot("Thursday", "13:00", "14:00", "A03"))
maths.add_timeslot(TimeSlot("Friday", "10:00", "11:00", "A05"))
maths.enrol_student("Aisha")
maths.enrol_student("Jordan")

softdev.display_subject_info()
maths.display_subject_info()
softdev.remove_student("Liam")
softdev.display_subject_info()
`,
    xpReward: 80,
    exampleTitle: 'Event Booking System',
    exampleCode: `class Seat:
    """Represents a seat in a venue."""
    def __init__(self, row, number, seat_type="standard"):
        self.row = row
        self.number = number
        self.seat_type = seat_type
        self.is_booked = False
        self.occupant = None

class Event:
    """Manages an event with seats and attendees."""
    def __init__(self, name, venue, date, capacity):
        self.name = name
        self.venue = venue
        self.date = date
        self.capacity = capacity
        self.seats = []
        self.waitlist = []
        # Auto-setup: generate seats
        for row in "ABCD":
            for num in range(1, (capacity // 4) + 1):
                self.seats.append(Seat(row, num))

    def book_seat(self, row, number, attendee):
        for seat in self.seats:
            if seat.row == row and seat.number == number:
                if not seat.is_booked:
                    seat.is_booked = True
                    seat.occupant = attendee
                    print(f"Seat {row}{number} booked for {attendee}")
                    return True
                else:
                    print(f"Seat {row}{number} already taken. Adding to waitlist.")
                    self.waitlist.append(attendee)
                    return False
        print("Seat not found")
        return False

    def get_availability(self):
        available = sum(1 for s in self.seats if not s.is_booked)
        return available

    def display_event(self):
        print(f"\\n=== {self.name} ===")
        print(f"Venue: {self.venue} | Date: {self.date}")
        print(f"Capacity: {self.capacity} | Available: {self.get_availability()}")
        print(f"Waitlist: {len(self.waitlist)} people")

concert = Event("Jazz Night", "Melbourne Town Hall", "2025-08-15", 16)
concert.book_seat("A", 1, "Aisha")
concert.book_seat("A", 2, "Liam")
concert.book_seat("B", 3, "Mei")
concert.book_seat("A", 1, "Jordan")  # Already taken
concert.display_event()
`,
  },

  // MODULE 4: Encapsulation
  {
    id: 'enc-easy',
    moduleId: 'encapsulation',
    difficulty: 'easy',
    title: 'Password Protector',
    description: 'Create a `Password` class with a private attribute `__password`. Include a `set_password()` method that only accepts passwords 8+ characters long, and a `check_password(attempt)` method that returns True/False.',
    expectedBehavior: 'Short passwords rejected, valid passwords accepted, check_password() correctly validates attempts.',
    hints: [
      'Use double underscore for the private attribute: self.__password',
      'In set_password(), check len(password) >= 8',
      'check_password() returns self.__password == attempt',
    ],
    starterCode: `class Password:
    """Secure password storage with validation."""

    def __init__(self):
        self.__password = ""  # Private attribute

    def set_password(self, password):
        # Only accept passwords 8+ characters
        pass

    def check_password(self, attempt):
        # Return True if attempt matches, False otherwise
        pass

# Test your class
p = Password()
p.set_password("short")   # Should be rejected
p.set_password("SecurePass123")  # Should be accepted
print(p.check_password("wrong"))  # Should print False
print(p.check_password("SecurePass123"))  # Should print True
`,
    sampleSolution: `class Password:
    def __init__(self):
        self.__password = ""

    def set_password(self, password):
        if len(password) >= 8:
            self.__password = password
            print("Password set successfully")
        else:
            print("Error: Password must be at least 8 characters")

    def check_password(self, attempt):
        return self.__password == attempt

p = Password()
p.set_password("short")
p.set_password("SecurePass123")
print(p.check_password("wrong"))
print(p.check_password("SecurePass123"))
`,
    xpReward: 30,
    exampleTitle: 'Thermostat',
    exampleCode: `class Thermostat:
    """A thermostat with private temperature validation."""

    def __init__(self, initial_temp):
        self.__temperature = initial_temp
        self.__min_temp = 10
        self.__max_temp = 35

    def set_temperature(self, temp):
        if self.__min_temp <= temp <= self.__max_temp:
            self.__temperature = temp
            print(f"Temperature set to {temp}°C")
        else:
            print(f"Invalid: must be {self.__min_temp}–{self.__max_temp}°C")

    def get_temperature(self):
        return self.__temperature

t = Thermostat(22)
print(f"Current: {t.get_temperature()}°C")
t.set_temperature(45)    # Too hot — rejected
t.set_temperature(5)     # Too cold — rejected
t.set_temperature(26)    # Valid
print(f"Current: {t.get_temperature()}°C")
`,
  },
  {
    id: 'enc-medium',
    moduleId: 'encapsulation',
    difficulty: 'medium',
    title: 'Secure Bank Account',
    description: 'Create a `BankAccount` class with private `__balance` and `__pin` attributes. Include methods: `deposit(amount)`, `withdraw(amount, pin)` (requires correct PIN and sufficient funds), `get_balance(pin)` (requires correct PIN), and `change_pin(old_pin, new_pin)`.',
    expectedBehavior: 'Balance protected by PIN. Invalid PIN rejected, insufficient funds rejected, valid operations succeed.',
    hints: [
      'Check pin against self.__pin before sensitive operations',
      'withdraw() needs both correct PIN AND sufficient funds',
      'change_pin() requires old PIN to be correct first',
    ],
    starterCode: `class BankAccount:
    """Secure bank account with PIN protection."""

    def __init__(self, owner, initial_balance, pin):
        self.owner = owner
        self.__balance = initial_balance  # Private
        self.__pin = pin                  # Private

    def deposit(self, amount):
        pass

    def withdraw(self, amount, pin):
        pass

    def get_balance(self, pin):
        pass

    def change_pin(self, old_pin, new_pin):
        pass

# Test your class
acc = BankAccount("Aisha", 1000, "1234")
acc.deposit(500)
print(acc.get_balance("1234"))
acc.withdraw(200, "wrong")  # Should fail
acc.withdraw(200, "1234")   # Should succeed
print(acc.get_balance("1234"))
`,
    sampleSolution: `class BankAccount:
    def __init__(self, owner, initial_balance, pin):
        self.owner = owner
        self.__balance = initial_balance
        self.__pin = pin

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited \${amount:.2f}. New balance: \${self.__balance:.2f}")
        else:
            print("Invalid deposit amount")

    def withdraw(self, amount, pin):
        if pin != self.__pin:
            print("Incorrect PIN")
            return False
        if amount > self.__balance:
            print("Insufficient funds")
            return False
        self.__balance -= amount
        print(f"Withdrew \${amount:.2f}")
        return True

    def get_balance(self, pin):
        if pin != self.__pin:
            print("Incorrect PIN")
            return None
        return self.__balance

    def change_pin(self, old_pin, new_pin):
        if old_pin != self.__pin:
            print("Incorrect PIN")
            return False
        self.__pin = new_pin
        print("PIN changed successfully")
        return True

acc = BankAccount("Aisha", 1000, "1234")
acc.deposit(500)
print(acc.get_balance("1234"))
acc.withdraw(200, "wrong")
acc.withdraw(200, "1234")
print(acc.get_balance("1234"))
`,
    xpReward: 50,
    exampleTitle: 'Membership Card',
    exampleCode: `class MembershipCard:
    """Store membership card with private points."""

    def __init__(self, member_name):
        self.member_name = member_name
        self.__points = 0
        self.__tier = "Bronze"

    def earn_points(self, amount):
        if amount > 0:
            self.__points += amount
            self.__update_tier()
            print(f"Earned {amount} pts. Total: {self.__points}")

    def redeem_points(self, amount):
        if amount > self.__points:
            print("Insufficient points")
            return False
        self.__points -= amount
        print(f"Redeemed {amount} pts. Remaining: {self.__points}")
        return True

    def __update_tier(self):
        if self.__points >= 1000:
            self.__tier = "Gold"
        elif self.__points >= 500:
            self.__tier = "Silver"

    def get_status(self):
        return f"{self.member_name} | Tier: {self.__tier} | {self.__points} pts"

card = MembershipCard("Sam")
card.earn_points(300)
card.earn_points(400)
card.redeem_points(100)
card.redeem_points(900)  # Should fail — insufficient points
print(card.get_status())
`,
  },
  {
    id: 'enc-hard',
    moduleId: 'encapsulation',
    difficulty: 'hard',
    title: 'Medical Records System',
    description: 'Design a `MedicalRecord` class with private attributes for patient name, date of birth, blood type, conditions list, and medications list. All access must go through validated methods. Include `add_condition()`, `add_medication()`, `remove_medication()`, and `generate_summary()` that returns a formatted string.',
    expectedBehavior: 'All data private, accessed only through methods, generate_summary() returns formatted patient information.',
    hints: [
      'All attributes use double underscore prefix',
      'add_condition/medication should check for duplicates',
      'generate_summary() formats all non-sensitive info nicely',
    ],
    starterCode: `class MedicalRecord:
    """Secure medical record system using encapsulation."""

    def __init__(self, patient_name, dob, blood_type):
        self.__patient_name = patient_name
        self.__dob = dob
        self.__blood_type = blood_type
        self.__conditions = []
        self.__medications = []

    def get_name(self):
        pass

    def add_condition(self, condition):
        pass

    def add_medication(self, medication):
        pass

    def remove_medication(self, medication):
        pass

    def generate_summary(self):
        pass

# Test your implementation
record = MedicalRecord("Jordan Smith", "2007-03-15", "A+")
record.add_condition("Asthma")
record.add_condition("Hay fever")
record.add_medication("Ventolin")
record.add_medication("Loratadine")
record.remove_medication("Loratadine")
print(record.generate_summary())
`,
    sampleSolution: `class MedicalRecord:
    def __init__(self, patient_name, dob, blood_type):
        self.__patient_name = patient_name
        self.__dob = dob
        self.__blood_type = blood_type
        self.__conditions = []
        self.__medications = []

    def get_name(self):
        return self.__patient_name

    def add_condition(self, condition):
        if condition not in self.__conditions:
            self.__conditions.append(condition)
            print(f"Added condition: {condition}")
        else:
            print(f"Condition already recorded: {condition}")

    def add_medication(self, medication):
        if medication not in self.__medications:
            self.__medications.append(medication)
            print(f"Added medication: {medication}")
        else:
            print(f"Medication already recorded: {medication}")

    def remove_medication(self, medication):
        if medication in self.__medications:
            self.__medications.remove(medication)
            print(f"Removed medication: {medication}")
        else:
            print(f"Medication not found: {medication}")

    def generate_summary(self):
        conditions = ", ".join(self.__conditions) if self.__conditions else "None"
        medications = ", ".join(self.__medications) if self.__medications else "None"
        return (
            f"Patient: {self.__patient_name}\\n"
            f"DOB: {self.__dob}\\n"
            f"Blood Type: {self.__blood_type}\\n"
            f"Conditions: {conditions}\\n"
            f"Current Medications: {medications}"
        )

record = MedicalRecord("Jordan Smith", "2007-03-15", "A+")
record.add_condition("Asthma")
record.add_condition("Hay fever")
record.add_medication("Ventolin")
record.add_medication("Loratadine")
record.remove_medication("Loratadine")
print(record.generate_summary())
`,
    xpReward: 80,
    exampleTitle: 'Employee Record',
    exampleCode: `class EmployeeRecord:
    """HR record with private sensitive data."""

    def __init__(self, name, emp_id, salary):
        self.__name = name
        self.__emp_id = emp_id
        self.__salary = salary
        self.__performance_notes = []

    def get_name(self):
        return self.__name

    def get_employee_id(self):
        return self.__emp_id

    def give_raise(self, percentage):
        if 0 < percentage <= 20:
            old = self.__salary
            self.__salary *= (1 + percentage / 100)
            print(f"Raise: \${old:,.0f} -> \${self.__salary:,.0f}")
        else:
            print("Raise must be between 1% and 20%")

    def add_note(self, note):
        if note not in self.__performance_notes:
            self.__performance_notes.append(note)

    def generate_summary(self):
        notes = "\\n  ".join(self.__performance_notes) if self.__performance_notes else "None"
        return (
            f"Employee: {self.__name}\\n"
            f"ID: {self.__emp_id}\\n"
            f"Salary: \${self.__salary:,.0f}\\n"
            f"Performance Notes:\\n  {notes}"
        )

emp = EmployeeRecord("Jordan Lee", "EMP-0042", 65000)
emp.add_note("Exceeded Q1 targets")
emp.add_note("Led team training workshop")
emp.give_raise(5)
emp.give_raise(25)   # Rejected — too high
print(emp.generate_summary())
`,
  },

  // MODULE 5: Inheritance
  {
    id: 'inh-easy',
    moduleId: 'inheritance',
    difficulty: 'easy',
    title: 'Animal Kingdom',
    description: 'Create a parent class `Animal` with `name` and `sound` attributes and a `speak()` method that prints "[name] says [sound]". Create child classes `Dog`, `Cat`, and `Bird` that inherit from Animal with appropriate sounds. Create one object of each and call speak().',
    expectedBehavior: 'Three animal objects each correctly calling speak() with their unique sounds.',
    hints: [
      'Animal is the parent class: class Animal:',
      'Dog inherits: class Dog(Animal):',
      'In child constructors, call super().__init__()',
    ],
    starterCode: `class Animal:
    """Parent class for all animals."""
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        pass  # Print "[name] says [sound]"

class Dog(Animal):
    def __init__(self, name):
        pass  # Call super with correct sound

class Cat(Animal):
    def __init__(self, name):
        pass

class Bird(Animal):
    def __init__(self, name):
        pass

# Create objects and test
`,
    sampleSolution: `class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        print(f"{self.name} says {self.sound}!")

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "Woof")

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "Meow")

class Bird(Animal):
    def __init__(self, name):
        super().__init__(name, "Tweet")

d = Dog("Rex")
c = Cat("Whiskers")
b = Bird("Tweety")
d.speak()
c.speak()
b.speak()
`,
    xpReward: 30,
    exampleTitle: 'Vehicle Hierarchy',
    exampleCode: `class Vehicle:
    """Parent class for all vehicles."""
    def __init__(self, make, fuel_type):
        self.make = make
        self.fuel_type = fuel_type

    def travel(self):
        print(f"{self.make} is moving...")

class Car(Vehicle):
    def __init__(self, make):
        super().__init__(make, "Petrol")

    def travel(self):
        print(f"{self.make} drives on the road [{self.fuel_type}]")

class Boat(Vehicle):
    def __init__(self, make):
        super().__init__(make, "Diesel")

    def travel(self):
        print(f"{self.make} sails on water [{self.fuel_type}]")

class Plane(Vehicle):
    def __init__(self, make):
        super().__init__(make, "Jet fuel")

    def travel(self):
        print(f"{self.make} flies through the air [{self.fuel_type}]")

car   = Car("Toyota")
boat  = Boat("Yamaha")
plane = Plane("Boeing")

car.travel()
boat.travel()
plane.travel()
`,
  },
  {
    id: 'inh-medium',
    moduleId: 'inheritance',
    difficulty: 'medium',
    title: 'Shape Calculator',
    description: 'Create a `Shape` parent class with a `name` attribute and `calculate_area()` method returning 0. Create child classes `Rectangle` (width, height), `Circle` (radius), and `Triangle` (base, height) that each override `calculate_area()`. Add a `describe()` method that prints the shape name and its area.',
    expectedBehavior: 'Each shape correctly calculates and displays its area using the overridden method.',
    hints: [
      'Use super().__init__(name) in child constructors',
      'import math for math.pi in Circle',
      'Triangle area = 0.5 * base * height',
    ],
    starterCode: `import math

class Shape:
    """Parent class for geometric shapes."""
    def __init__(self, name):
        self.name = name

    def calculate_area(self):
        return 0

    def describe(self):
        pass  # Print: "[name]: area = [area]"

class Rectangle(Shape):
    def __init__(self, width, height):
        pass

    def calculate_area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        pass

    def calculate_area(self):
        pass

class Triangle(Shape):
    def __init__(self, base, height):
        pass

    def calculate_area(self):
        pass

# Test with all three shapes
`,
    sampleSolution: `import math

class Shape:
    def __init__(self, name):
        self.name = name

    def calculate_area(self):
        return 0

    def describe(self):
        print(f"{self.name}: area = {self.calculate_area():.2f}")

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height

    def calculate_area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        super().__init__("Circle")
        self.radius = radius

    def calculate_area(self):
        return math.pi * self.radius ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        super().__init__("Triangle")
        self.base = base
        self.height = height

    def calculate_area(self):
        return 0.5 * self.base * self.height

shapes = [Rectangle(5, 3), Circle(4), Triangle(6, 8)]
for shape in shapes:
    shape.describe()
`,
    xpReward: 50,
    exampleTitle: 'Employee Pay Calculator',
    exampleCode: `class Employee:
    """Parent class for all staff."""
    def __init__(self, name, base_rate):
        self.name = name
        self.base_rate = base_rate

    def calculate_pay(self):
        return self.base_rate

    def describe(self):
        pay = self.calculate_pay()
        print(f"{self.name}: \${pay:,.2f}/month")

class FullTime(Employee):
    def __init__(self, name, monthly_salary):
        super().__init__(name, monthly_salary)

    def calculate_pay(self):
        return self.base_rate

class PartTime(Employee):
    def __init__(self, name, hourly_rate, hours_per_week):
        super().__init__(name, hourly_rate)
        self.hours_per_week = hours_per_week

    def calculate_pay(self):
        return self.base_rate * self.hours_per_week * 4

class Contractor(Employee):
    def __init__(self, name, day_rate, days):
        super().__init__(name, day_rate)
        self.days = days

    def calculate_pay(self):
        return self.base_rate * self.days

staff = [
    FullTime("Alice", 5500),
    PartTime("Bob", 28.50, 20),
    Contractor("Charlie", 450, 18),
]
print("Monthly pay summary:")
for emp in staff:
    emp.describe()
`,
  },
  {
    id: 'inh-hard',
    moduleId: 'inheritance',
    difficulty: 'hard',
    title: 'School Management System',
    description: 'Design a class hierarchy: `Person` (parent with name, age, email) → `Student` (adds student_id, year_level, subjects list, enrol_subject() method) and `Teacher` (adds employee_id, subjects_taught list, assign_subject() method). Each class should have a `display_info()` method. Create at least one of each and demonstrate both inherited and unique methods.',
    expectedBehavior: 'Full hierarchy with Person, Student, Teacher. Objects demonstrate inherited and unique methods.',
    hints: [
      'Person has the common attributes shared by all people',
      'Student and Teacher both call super().__init__() with name, age, email',
      'display_info() in children should call super().display_info() then add their own info',
    ],
    starterCode: `class Person:
    """Base class for all people in the school system."""
    def __init__(self, name, age, email):
        pass

    def display_info(self):
        pass

class Student(Person):
    def __init__(self, name, age, email, student_id, year_level):
        pass

    def enrol_subject(self, subject):
        pass

    def display_info(self):
        pass  # Show Person info + Student info

class Teacher(Person):
    def __init__(self, name, age, email, employee_id):
        pass

    def assign_subject(self, subject):
        pass

    def display_info(self):
        pass  # Show Person info + Teacher info

# Create objects and demonstrate
`,
    sampleSolution: `class Person:
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

    def display_info(self):
        print(f"Name: {self.name}, Age: {self.age}, Email: {self.email}")

class Student(Person):
    def __init__(self, name, age, email, student_id, year_level):
        super().__init__(name, age, email)
        self.student_id = student_id
        self.year_level = year_level
        self.subjects = []

    def enrol_subject(self, subject):
        self.subjects.append(subject)
        print(f"{self.name} enrolled in {subject}")

    def display_info(self):
        super().display_info()
        print(f"Student ID: {self.student_id}, Year: {self.year_level}")
        print(f"Subjects: {', '.join(self.subjects) if self.subjects else 'None'}")

class Teacher(Person):
    def __init__(self, name, age, email, employee_id):
        super().__init__(name, age, email)
        self.employee_id = employee_id
        self.subjects_taught = []

    def assign_subject(self, subject):
        self.subjects_taught.append(subject)
        print(f"{self.name} assigned to teach {subject}")

    def display_info(self):
        super().display_info()
        print(f"Employee ID: {self.employee_id}")
        print(f"Teaches: {', '.join(self.subjects_taught) if self.subjects_taught else 'None'}")

student = Student("Aisha", 17, "aisha@school.edu", "STU001", 12)
student.enrol_subject("Software Development")
student.enrol_subject("Further Maths")
print("--- Student ---")
student.display_info()

teacher = Teacher("Ms Wong", 35, "wong@school.edu", "EMP042")
teacher.assign_subject("Software Development")
teacher.assign_subject("IT Applications")
print("\\n--- Teacher ---")
teacher.display_info()
`,
    xpReward: 80,
    exampleTitle: 'Company Staff Hierarchy',
    exampleCode: `class Staff:
    """Base class for all staff members."""
    def __init__(self, name, age, department):
        self.name = name
        self.age = age
        self.department = department

    def display_info(self):
        print(f"Name: {self.name} | Age: {self.age} | Dept: {self.department}")

class FullTimeStaff(Staff):
    def __init__(self, name, age, department, staff_id, salary):
        super().__init__(name, age, department)
        self.staff_id = staff_id
        self.salary = salary
        self.projects = []

    def assign_project(self, project):
        self.projects.append(project)
        print(f"{self.name} assigned to: {project}")

    def display_info(self):
        super().display_info()
        print(f"ID: {self.staff_id} | Salary: \${self.salary:,}")
        print(f"Projects: {', '.join(self.projects) if self.projects else 'None'}")

class Intern(Staff):
    def __init__(self, name, age, department, university):
        super().__init__(name, age, department)
        self.university = university
        self.mentor = None

    def assign_mentor(self, mentor_name):
        self.mentor = mentor_name
        print(f"{self.name}'s mentor: {mentor_name}")

    def display_info(self):
        super().display_info()
        print(f"University: {self.university}")
        print(f"Mentor: {self.mentor or 'Unassigned'}")

emp = FullTimeStaff("Priya", 31, "Engineering", "ENG-007", 95000)
emp.assign_project("AI Dashboard")
emp.assign_project("API Redesign")
print("--- Full-Time Staff ---")
emp.display_info()

intern = Intern("Marcus", 21, "Engineering", "RMIT")
intern.assign_mentor("Priya")
print("\\n--- Intern ---")
intern.display_info()
`,
  },

  // MODULE 7: Polymorphism
  {
    id: 'poly-easy',
    moduleId: 'polymorphism',
    difficulty: 'easy',
    title: 'Animal Orchestra',
    description: 'Create an `Animal` parent class with a `make_sound()` method. Create 3 child classes (`Dog`, `Cat`, `Cow`) that each override `make_sound()`. Create a list with one of each animal and loop through it calling `make_sound()` on each — demonstrating polymorphism.',
    expectedBehavior: 'Loop processes different animal objects through the same interface, each making their own sound.',
    hints: [
      'All animals share the same make_sound() method name',
      'Each child class overrides make_sound() differently',
      'The for loop shows polymorphism in action',
    ],
    starterCode: `class Animal:
    def __init__(self, name):
        self.name = name

    def make_sound(self):
        return "..."

class Dog(Animal):
    def make_sound(self):
        pass  # Return "[name]: Woof!"

class Cat(Animal):
    def make_sound(self):
        pass

class Cow(Animal):
    def make_sound(self):
        pass

# Create a list of animals and demonstrate polymorphism
animals = []
# Add one Dog, Cat, and Cow to the list

# Loop and call make_sound() on each
`,
    sampleSolution: `class Animal:
    def __init__(self, name):
        self.name = name

    def make_sound(self):
        return "..."

class Dog(Animal):
    def make_sound(self):
        return f"{self.name}: Woof!"

class Cat(Animal):
    def make_sound(self):
        return f"{self.name}: Meow!"

class Cow(Animal):
    def make_sound(self):
        return f"{self.name}: Moo!"

animals = [Dog("Rex"), Cat("Whiskers"), Cow("Bessie")]

for animal in animals:
    print(animal.make_sound())
`,
    xpReward: 30,
    exampleTitle: 'Instrument Orchestra',
    exampleCode: `class Instrument:
    def __init__(self, name):
        self.name = name

    def play(self):
        return f"{self.name} makes a generic sound"

class Guitar(Instrument):
    def play(self):
        return f"{self.name}: Strum! Strum!"

class Piano(Instrument):
    def play(self):
        return f"{self.name}: Plink! Plink!"

class Drums(Instrument):
    def play(self):
        return f"{self.name}: Bang! Crash!"

class Violin(Instrument):
    def play(self):
        return f"{self.name}: Screech... Bow!"

# All different types processed through the same interface
band = [Guitar("Fender"), Piano("Steinway"), Drums("Pearl Kit"), Violin("Stradivari")]

print("Band performance:")
for instrument in band:
    print(f"  {instrument.play()}")
`,
  },
  {
    id: 'poly-medium',
    moduleId: 'polymorphism',
    difficulty: 'medium',
    title: 'Payment Processor',
    description: 'Create a `Payment` parent class with a `process(amount)` method. Create child classes `CreditCard`, `PayPal`, and `BankTransfer` that each override `process()` with different messages and a 10-second processing simulation (just print a message). Demonstrate processing a list of payments polymorphically.',
    expectedBehavior: 'Three payment types each process differently. List of payments processed through common interface.',
    hints: [
      'Each payment type has unique processing logic/messages',
      'Use a list of mixed payment objects',
      'The loop demonstrates polymorphism',
    ],
    starterCode: `class Payment:
    """Base payment class."""
    def __init__(self, owner):
        self.owner = owner

    def process(self, amount):
        print(f"Processing payment of \${amount:.2f}...")

class CreditCard(Payment):
    def __init__(self, owner, card_number):
        super().__init__(owner)
        self.card_number = card_number

    def process(self, amount):
        pass  # Show card-specific processing

class PayPal(Payment):
    def __init__(self, owner, email):
        super().__init__(owner)
        self.email = email

    def process(self, amount):
        pass

class BankTransfer(Payment):
    def __init__(self, owner, bsb, account):
        super().__init__(owner)
        self.bsb = bsb
        self.account = account

    def process(self, amount):
        pass

# Create a list of different payment types and process them
`,
    sampleSolution: `class Payment:
    def __init__(self, owner):
        self.owner = owner

    def process(self, amount):
        print(f"Processing payment of \${amount:.2f}...")

class CreditCard(Payment):
    def __init__(self, owner, card_number):
        super().__init__(owner)
        self.card_number = card_number[-4:]  # Store last 4 digits only

    def process(self, amount):
        print(f"Credit Card payment: \${amount:.2f}")
        print(f"  Owner: {self.owner}, Card ending: ****{self.card_number}")
        print("  Contacting card network... Approved!")

class PayPal(Payment):
    def __init__(self, owner, email):
        super().__init__(owner)
        self.email = email

    def process(self, amount):
        print(f"PayPal payment: \${amount:.2f}")
        print(f"  Account: {self.email}")
        print("  Redirecting to PayPal... Payment confirmed!")

class BankTransfer(Payment):
    def __init__(self, owner, bsb, account):
        super().__init__(owner)
        self.bsb = bsb
        self.account = account

    def process(self, amount):
        print(f"Bank Transfer: \${amount:.2f}")
        print(f"  BSB: {self.bsb}, Account: {self.account}")
        print("  Transfer submitted. Funds in 1-3 business days.")

payments = [
    CreditCard("Aisha", "4111111111111234"),
    PayPal("Liam", "liam@email.com"),
    BankTransfer("Mei", "063000", "12345678"),
]

print("Processing all payments:\\n")
for payment in payments:
    payment.process(99.99)
    print()
`,
    xpReward: 50,
    exampleTitle: 'Notification System',
    exampleCode: `class Notification:
    """Base notification class."""
    def __init__(self, recipient):
        self.recipient = recipient

    def send(self, message):
        print(f"Sending to {self.recipient}: {message}")

class EmailNotification(Notification):
    def __init__(self, recipient, email):
        super().__init__(recipient)
        self.email = email

    def send(self, message):
        print(f"EMAIL -> {self.email}")
        print(f"  Body: {message}")

class SMSNotification(Notification):
    def __init__(self, recipient, phone):
        super().__init__(recipient)
        self.phone = phone

    def send(self, message):
        print(f"SMS -> {self.phone}")
        print(f"  Msg: {message[:80]}")

class PushNotification(Notification):
    def __init__(self, recipient, device_id):
        super().__init__(recipient)
        self.device_id = device_id

    def send(self, message):
        print(f"PUSH -> Device {self.device_id}")
        print(f"  {self.recipient}: {message}")

channels = [
    EmailNotification("Alice", "alice@example.com"),
    SMSNotification("Bob", "+61 412 345 678"),
    PushNotification("Charlie", "device-abc123"),
]

alert = "Your order has shipped!"
print("Sending notifications:\\n")
for ch in channels:
    ch.send(alert)
    print()
`,
  },
  {
    id: 'poly-hard',
    moduleId: 'polymorphism',
    difficulty: 'hard',
    title: 'Game Character System',
    description: 'Build a game character system with a `Character` parent class (name, health, attack_power) and child classes `Warrior`, `Mage`, and `Archer`. Each must override an `attack(target)` method with unique behaviour (warriors do double damage, mages do area damage with special message, archers do ranged attacks). Add a `take_damage(amount)` method and an `is_alive` property. Simulate a battle between characters.',
    expectedBehavior: 'Characters with unique attack styles. Battle demonstrates polymorphism with health tracking.',
    hints: [
      'is_alive returns self.health > 0',
      'take_damage(amount) reduces health, min 0',
      'Each attack() method should be unique and interesting',
    ],
    starterCode: `class Character:
    """Base class for all game characters."""
    def __init__(self, name, health, attack_power):
        self.name = name
        self.health = health
        self.attack_power = attack_power

    def attack(self, target):
        pass

    def take_damage(self, amount):
        pass

    def is_alive(self):
        pass

    def status(self):
        pass

class Warrior(Character):
    def attack(self, target):
        pass  # Double attack power

class Mage(Character):
    def attack(self, target):
        pass  # Magic attack with special message

class Archer(Character):
    def attack(self, target):
        pass  # Ranged attack

# Simulate a battle!
`,
    sampleSolution: `class Character:
    def __init__(self, name, health, attack_power):
        self.name = name
        self.health = health
        self.max_health = health
        self.attack_power = attack_power

    def attack(self, target):
        damage = self.attack_power
        target.take_damage(damage)
        print(f"{self.name} attacks {target.name} for {damage} damage!")

    def take_damage(self, amount):
        self.health = max(0, self.health - amount)
        print(f"  {self.name} has {self.health}/{self.max_health} HP remaining")

    def is_alive(self):
        return self.health > 0

    def status(self):
        status = "ALIVE" if self.is_alive() else "DEFEATED"
        return f"{self.name}: {self.health}/{self.max_health} HP [{status}]"

class Warrior(Character):
    def attack(self, target):
        damage = self.attack_power * 2
        target.take_damage(damage)
        print(f"⚔️  {self.name} POWER STRIKES {target.name} for {damage} damage!")

class Mage(Character):
    def attack(self, target):
        damage = self.attack_power + 15
        target.take_damage(damage)
        print(f"✨ {self.name} casts FIREBALL at {target.name} for {damage} magic damage!")

class Archer(Character):
    def attack(self, target):
        damage = self.attack_power + 5
        target.take_damage(damage)
        print(f"🏹 {self.name} fires an arrow at {target.name} for {damage} damage!")

heroes = [Warrior("Thor", 150, 20), Mage("Merlin", 90, 25), Archer("Legolas", 110, 18)]
boss = Character("Dragon", 300, 30)

print("=== BATTLE BEGINS ===\\n")
for hero in heroes:
    if boss.is_alive():
        hero.attack(boss)
        print()

print("\\n=== FINAL STATUS ===")
for hero in heroes:
    print(hero.status())
print(boss.status())
`,
    xpReward: 80,
    exampleTitle: 'Sports Competition',
    exampleCode: `class Athlete:
    """Base class for all athletes."""
    def __init__(self, name, fitness):
        self.name = name
        self.fitness = fitness
        self.stamina = 100

    def compete(self):
        pass

    def train(self):
        self.fitness = min(100, self.fitness + 5)
        print(f"{self.name} trained. Fitness: {self.fitness}")

    def is_fit(self):
        return self.stamina > 0

    def status(self):
        state = "FIT" if self.is_fit() else "EXHAUSTED"
        return f"{self.name} | Fitness: {self.fitness} | Stamina: {self.stamina} [{state}]"

class Swimmer(Athlete):
    def compete(self):
        self.stamina -= 20
        time = 120 - self.fitness * 0.5
        print(f"{self.name} swims 100m in {time:.1f}s!")

class Sprinter(Athlete):
    def compete(self):
        self.stamina -= 30
        speed = self.fitness / 10
        print(f"{self.name} sprints at {speed:.1f} m/s!")

class Weightlifter(Athlete):
    def compete(self):
        self.stamina -= 25
        weight = self.fitness * 2
        print(f"{self.name} lifts {weight} kg!")

athletes = [
    Swimmer("Kylie", 88),
    Sprinter("Usain", 95),
    Weightlifter("Thor", 90),
]

print("=== COMPETITION ===\\n")
for a in athletes:
    a.compete()

print("\\n=== FINAL STATUS ===")
for a in athletes:
    print(a.status())
`,
  },
  // MODULE 6: Abstraction
  {
    id: 'abs-easy',
    moduleId: 'abstraction',
    difficulty: 'easy',
    title: 'Simple Calculator Interface',
    description: 'Create a `Calculator` class that provides a simple public interface. Add four public methods: `add(a, b)`, `subtract(a, b)`, `multiply(a, b)`, and `divide(a, b)`. The divide method should use a private method `__validate_divisor(b)` that returns False if b is zero, and True otherwise. The divide method should use the private validator before performing division.',
    expectedBehavior: 'Public methods work correctly. Division by zero is caught by the private validator and prints an error instead of crashing.',
    hints: [
      'Private methods start with double underscore: def __validate_divisor(self, b)',
      'divide() calls self.__validate_divisor(b) before dividing',
      'Return None from divide() if validation fails',
    ],
    starterCode: `class Calculator:
    """Simple calculator with a clean public interface."""

    def add(self, a, b):
        pass

    def subtract(self, a, b):
        pass

    def multiply(self, a, b):
        pass

    def __validate_divisor(self, b):
        # Return False if b is zero, True otherwise
        pass

    def divide(self, a, b):
        # Use __validate_divisor before dividing
        pass

# Test the calculator
calc = Calculator()
print(calc.add(10, 5))
print(calc.subtract(10, 5))
print(calc.multiply(4, 7))
print(calc.divide(20, 4))
calc.divide(10, 0)  # Should show an error message
`,
    sampleSolution: `class Calculator:
    """Simple calculator with a clean public interface."""

    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

    def multiply(self, a, b):
        return a * b

    def __validate_divisor(self, b):
        if b == 0:
            print("Error: Cannot divide by zero")
            return False
        return True

    def divide(self, a, b):
        if not self.__validate_divisor(b):
            return None
        return a / b

calc = Calculator()
print(calc.add(10, 5))
print(calc.subtract(10, 5))
print(calc.multiply(4, 7))
print(calc.divide(20, 4))
calc.divide(10, 0)
`,
    xpReward: 30,
    exampleTitle: 'ATM Machine',
    exampleCode: `class ATM:
    """ATM with a simple public interface hiding internal complexity."""

    def __init__(self, bank_name):
        self.__bank_name = bank_name
        self.__notes = {50: 20, 20: 30, 10: 50}  # denomination: count

    # Simple public interface
    def withdraw(self, amount):
        """All users need: one simple method."""
        if not self.__validate_amount(amount):
            return
        if not self.__check_funds(amount):
            return
        self.__dispense_cash(amount)
        print(f"Please take your \${amount}")

    def check_balance(self):
        total = sum(d * c for d, c in self.__notes.items())
        print(f"{self.__bank_name} ATM: \${total:,} available")

    # Hidden complexity — users never call these
    def __validate_amount(self, amount):
        if amount <= 0 or amount % 10 != 0:
            print("Invalid amount: must be positive and a multiple of $10")
            return False
        return True

    def __check_funds(self, amount):
        total = sum(d * c for d, c in self.__notes.items())
        if amount > total:
            print("Insufficient funds in ATM")
            return False
        return True

    def __dispense_cash(self, amount):
        remaining = amount
        for denom in sorted(self.__notes.keys(), reverse=True):
            while remaining >= denom and self.__notes[denom] > 0:
                remaining -= denom
                self.__notes[denom] -= 1

atm = ATM("Commonwealth Bank")
atm.check_balance()
atm.withdraw(150)
atm.withdraw(0)    # Invalid
atm.withdraw(75)   # Not a multiple of 10
atm.check_balance()
`,
  },
  {
    id: 'abs-medium',
    moduleId: 'abstraction',
    difficulty: 'medium',
    title: 'Music Player',
    description: 'Create a `MusicPlayer` class that exposes a simple public interface: `play(song)`, `pause()`, `stop()`, `next_track()`, `add_to_queue(song)`. Hide the complexity using private methods: `__load_song(song)`, `__update_state(state)`, and `__log_playback(action)`. The private log should track a playback history list. Add a `get_history()` public method.',
    expectedBehavior: 'Simple public interface works correctly. Internal state managed by private methods. History correctly tracks all actions.',
    hints: [
      'Private methods handle internal state changes',
      '__log_playback() appends to self.__history list',
      'play() should call __load_song(), __update_state(), and __log_playback()',
    ],
    starterCode: `class MusicPlayer:
    """Music player with clean public interface and hidden internals."""

    def __init__(self):
        self.__current_song = None
        self.__state = "stopped"    # Private state
        self.__queue = []           # Private queue
        self.__history = []         # Private history log

    # Public interface — what users interact with
    def play(self, song):
        pass

    def pause(self):
        pass

    def stop(self):
        pass

    def next_track(self):
        pass

    def add_to_queue(self, song):
        pass

    def get_history(self):
        pass

    # Private methods — hidden implementation
    def __load_song(self, song):
        pass

    def __update_state(self, state):
        pass

    def __log_playback(self, action):
        pass

# Test the player
player = MusicPlayer()
player.add_to_queue("Blinding Lights")
player.add_to_queue("Levitating")
player.add_to_queue("Watermelon Sugar")
player.play("Shape of You")
player.pause()
player.play("Shape of You")
player.next_track()
player.stop()
print("\\nPlayback history:")
for entry in player.get_history():
    print(f"  {entry}")
`,
    sampleSolution: `class MusicPlayer:
    """Music player with clean public interface and hidden internals."""

    def __init__(self):
        self.__current_song = None
        self.__state = "stopped"
        self.__queue = []
        self.__history = []

    def play(self, song):
        self.__load_song(song)
        self.__update_state("playing")
        self.__log_playback(f"Playing: {song}")
        print(f"Now playing: {song}")

    def pause(self):
        if self.__state == "playing":
            self.__update_state("paused")
            self.__log_playback(f"Paused: {self.__current_song}")
            print(f"Paused: {self.__current_song}")
        else:
            print("Nothing is playing")

    def stop(self):
        self.__update_state("stopped")
        self.__log_playback("Stopped playback")
        print("Playback stopped")
        self.__current_song = None

    def next_track(self):
        if self.__queue:
            next_song = self.__queue.pop(0)
            self.__load_song(next_song)
            self.__update_state("playing")
            self.__log_playback(f"Skipped to: {next_song}")
            print(f"Next track: {next_song}")
        else:
            print("Queue is empty")

    def add_to_queue(self, song):
        self.__queue.append(song)
        print(f"Added to queue: {song}")

    def get_history(self):
        return list(self.__history)

    def __load_song(self, song):
        self.__current_song = song

    def __update_state(self, state):
        self.__state = state

    def __log_playback(self, action):
        self.__history.append(action)

player = MusicPlayer()
player.add_to_queue("Blinding Lights")
player.add_to_queue("Levitating")
player.add_to_queue("Watermelon Sugar")
player.play("Shape of You")
player.pause()
player.play("Shape of You")
player.next_track()
player.stop()
print("\\nPlayback history:")
for entry in player.get_history():
    print(f"  {entry}")
`,
    xpReward: 50,
    exampleTitle: 'Smart Home Device',
    exampleCode: `class SmartLight:
    """Smart light with simple public interface hiding hardware complexity."""

    def __init__(self, room, device_id):
        self.room = room
        self.__device_id = device_id
        self.__brightness = 0
        self.__colour_temp = 4000  # Kelvin
        self.__is_on = False
        self.__event_log = []

    # Simple public interface
    def turn_on(self, brightness=80):
        self.__send_command("POWER_ON")
        self.__set_brightness(brightness)
        self.__is_on = True
        self.__log_event("Turned on")
        print(f"{self.room} light on at {brightness}%")

    def turn_off(self):
        self.__send_command("POWER_OFF")
        self.__brightness = 0
        self.__is_on = False
        self.__log_event("Turned off")
        print(f"{self.room} light off")

    def dim(self, level):
        if 0 <= level <= 100:
            self.__set_brightness(level)
            self.__log_event(f"Dimmed to {level}%")
            print(f"{self.room} dimmed to {level}%")

    def set_warm(self):
        self.__colour_temp = 2700
        self.__send_command(f"COLOUR_TEMP:{self.__colour_temp}")
        print(f"{self.room}: warm white")

    def get_status(self):
        return {"on": self.__is_on, "brightness": self.__brightness, "events": len(self.__event_log)}

    # Hidden implementation details
    def __send_command(self, cmd):
        pass  # Hardware communication hidden here

    def __set_brightness(self, level):
        self.__brightness = max(0, min(100, level))
        self.__send_command(f"BRIGHTNESS:{self.__brightness}")

    def __log_event(self, event):
        self.__event_log.append(event)

lounge = SmartLight("Lounge", "LIGHT-042")
lounge.turn_on(60)
lounge.set_warm()
lounge.dim(30)
lounge.turn_off()
print(lounge.get_status())
`,
  },
  {
    id: 'abs-hard',
    moduleId: 'abstraction',
    difficulty: 'hard',
    title: 'Online Order System',
    description: 'Build an `OrderSystem` class with a clean public interface: `place_order(customer, items)`, `cancel_order(order_id)`, `get_order_status(order_id)`, and `get_customer_orders(customer)`. Hide all complexity in private methods: `__generate_order_id()`, `__calculate_total(items)`, `__validate_order(customer, items)`, `__notify_customer(customer, message)`, and `__update_inventory(items)`. Demonstrate the interface with at least 3 orders.',
    expectedBehavior: 'Public interface is clean and simple. All internal processing uses private methods. Orders tracked correctly with generated IDs.',
    hints: [
      'Store orders as a list of dictionaries or a dict keyed by order ID',
      '__generate_order_id() can use a counter or a timestamp-based string',
      'place_order() calls validate, generate ID, calculate total, update inventory, notify',
    ],
    starterCode: `class OrderSystem:
    """Online order system with clean public interface."""

    _order_counter = 0

    def __init__(self, store_name):
        self.store_name = store_name
        self.__orders = {}
        self.__inventory = {
            "Python Book": 10,
            "USB Hub": 25,
            "Laptop Stand": 15,
            "Mechanical Keyboard": 8,
        }

    # Public interface
    def place_order(self, customer, items):
        pass

    def cancel_order(self, order_id):
        pass

    def get_order_status(self, order_id):
        pass

    def get_customer_orders(self, customer):
        pass

    # Private methods — hidden complexity
    def __generate_order_id(self):
        pass

    def __calculate_total(self, items):
        pass

    def __validate_order(self, customer, items):
        pass

    def __notify_customer(self, customer, message):
        pass

    def __update_inventory(self, items, restore=False):
        pass

# Test the system
system = OrderSystem("TechShop AU")
o1 = system.place_order("Aisha", {"Python Book": 2, "USB Hub": 1})
o2 = system.place_order("Liam", {"Laptop Stand": 1, "Mechanical Keyboard": 1})
o3 = system.place_order("Mei", {"Python Book": 1})
print(system.get_order_status(o1))
system.cancel_order(o2)
print(system.get_customer_orders("Aisha"))
`,
    sampleSolution: `class OrderSystem:
    """Online order system with clean public interface."""

    _order_counter = 0

    PRICES = {
        "Python Book": 49.99,
        "USB Hub": 29.99,
        "Laptop Stand": 59.99,
        "Mechanical Keyboard": 129.99,
    }

    def __init__(self, store_name):
        self.store_name = store_name
        self.__orders = {}
        self.__inventory = {
            "Python Book": 10,
            "USB Hub": 25,
            "Laptop Stand": 15,
            "Mechanical Keyboard": 8,
        }

    def place_order(self, customer, items):
        if not self.__validate_order(customer, items):
            return None
        order_id = self.__generate_order_id()
        total = self.__calculate_total(items)
        self.__update_inventory(items)
        self.__orders[order_id] = {
            "customer": customer,
            "items": items,
            "total": total,
            "status": "confirmed",
        }
        self.__notify_customer(customer, f"Order {order_id} confirmed. Total: \${total:.2f}")
        return order_id

    def cancel_order(self, order_id):
        if order_id not in self.__orders:
            print(f"Order {order_id} not found")
            return False
        order = self.__orders[order_id]
        if order["status"] == "cancelled":
            print(f"Order {order_id} already cancelled")
            return False
        self.__update_inventory(order["items"], restore=True)
        order["status"] = "cancelled"
        self.__notify_customer(order["customer"], f"Order {order_id} has been cancelled")
        return True

    def get_order_status(self, order_id):
        if order_id not in self.__orders:
            return f"Order {order_id} not found"
        o = self.__orders[order_id]
        return f"Order {order_id}: {o['status'].upper()} | Customer: {o['customer']} | Total: \${o['total']:.2f}"

    def get_customer_orders(self, customer):
        return [oid for oid, o in self.__orders.items() if o["customer"] == customer]

    def __generate_order_id(self):
        OrderSystem._order_counter += 1
        return f"ORD-{OrderSystem._order_counter:04d}"

    def __calculate_total(self, items):
        return sum(self.PRICES.get(item, 0) * qty for item, qty in items.items())

    def __validate_order(self, customer, items):
        if not customer or not items:
            print("Invalid order: missing customer or items")
            return False
        for item, qty in items.items():
            stock = self.__inventory.get(item, 0)
            if qty > stock:
                print(f"Insufficient stock for {item} (requested {qty}, available {stock})")
                return False
        return True

    def __notify_customer(self, customer, message):
        print(f"[Notification -> {customer}]: {message}")

    def __update_inventory(self, items, restore=False):
        for item, qty in items.items():
            if item in self.__inventory:
                if restore:
                    self.__inventory[item] += qty
                else:
                    self.__inventory[item] -= qty

system = OrderSystem("TechShop AU")
o1 = system.place_order("Aisha", {"Python Book": 2, "USB Hub": 1})
o2 = system.place_order("Liam", {"Laptop Stand": 1, "Mechanical Keyboard": 1})
o3 = system.place_order("Mei", {"Python Book": 1})
print(system.get_order_status(o1))
system.cancel_order(o2)
print(system.get_customer_orders("Aisha"))
`,
    xpReward: 80,
    exampleTitle: 'File Converter',
    exampleCode: `class FileConverter:
    """File converter with a simple public interface."""

    SUPPORTED_FORMATS = ["txt", "csv", "json", "xml"]

    def __init__(self):
        self.__conversion_log = []
        self.__error_count = 0

    # Clean public interface
    def convert(self, filename, from_format, to_format):
        """One simple method — hides all the conversion complexity."""
        if not self.__validate_formats(from_format, to_format):
            return False
        data = self.__read_file(filename, from_format)
        if data is None:
            return False
        converted = self.__transform_data(data, from_format, to_format)
        success = self.__write_file(filename, converted, to_format)
        self.__log_conversion(filename, from_format, to_format, success)
        return success

    def get_conversion_report(self):
        print(f"Total conversions: {len(self.__conversion_log)}")
        print(f"Errors: {self.__error_count}")
        for entry in self.__conversion_log[-3:]:
            print(f"  {entry}")

    # Hidden implementation
    def __validate_formats(self, from_fmt, to_fmt):
        for fmt in [from_fmt, to_fmt]:
            if fmt not in self.SUPPORTED_FORMATS:
                print(f"Unsupported format: {fmt}")
                return False
        if from_fmt == to_fmt:
            print("Source and target formats are the same")
            return False
        return True

    def __read_file(self, filename, fmt):
        print(f"  Reading {filename}.{fmt}...")
        return f"data_from_{filename}"

    def __transform_data(self, data, from_fmt, to_fmt):
        print(f"  Converting {from_fmt} -> {to_fmt}...")
        return f"{data}_as_{to_fmt}"

    def __write_file(self, filename, data, fmt):
        output = f"{filename}.{fmt}"
        print(f"  Writing {output}...")
        return True

    def __log_conversion(self, filename, from_fmt, to_fmt, success):
        status = "OK" if success else "FAIL"
        if not success:
            self.__error_count += 1
        self.__conversion_log.append(f"[{status}] {filename}: {from_fmt}->{to_fmt}")

converter = FileConverter()
converter.convert("report", "csv", "json")
converter.convert("data", "txt", "xml")
converter.convert("output", "csv", "pdf")  # Unsupported
print()
converter.get_conversion_report()
`,
  },

  // MODULE 8: Object Descriptions & UML
  {
    id: 'uml-easy',
    moduleId: 'object-descriptions-uml',
    difficulty: 'easy',
    title: 'Implement from an Object Description Table',
    description: 'Implement a `Movie` class from the following object description table:\n\n| Name | Type | Description |\n|---|---|---|\n| title | String | The movie title |\n| director | String | The director\'s name |\n| year | Integer | Release year |\n| rating | Float | Rating out of 10 |\n| is_watched | Boolean | Whether the user has watched it |\n| mark_watched() | Method | Sets is_watched to True and prints a message |\n| get_summary() | Method | Returns a formatted single-line summary string |\n\nThen create 3 Movie objects and demonstrate all methods.',
    expectedBehavior: 'Movie class matches the object description table exactly. All attributes and methods work as described. 3 objects created and demonstrated.',
    hints: [
      'Match the attribute names exactly as in the table (snake_case)',
      'is_watched starts as False in the constructor',
      'get_summary() returns a string, not print — use return',
    ],
    starterCode: `class Movie:
    """Implement this class from the object description table."""

    def __init__(self, title, director, year, rating):
        # Create all 5 attributes from the table
        pass

    def mark_watched(self):
        # Set is_watched to True and print a confirmation
        pass

    def get_summary(self):
        # Return a formatted one-line summary string
        pass

# Create 3 Movie objects
m1 = Movie("Inception", "Christopher Nolan", 2010, 8.8)
m2 = Movie("The Matrix", "Wachowski Sisters", 1999, 8.7)
m3 = Movie("Parasite", "Bong Joon-ho", 2019, 8.5)

# Test get_summary() on all three
print(m1.get_summary())
print(m2.get_summary())
print(m3.get_summary())

# Mark one as watched
m1.mark_watched()
print(m1.get_summary())  # Should now show watched status
`,
    sampleSolution: `class Movie:
    """Implemented from object description table."""

    def __init__(self, title, director, year, rating):
        self.title = title
        self.director = director
        self.year = year
        self.rating = rating
        self.is_watched = False

    def mark_watched(self):
        self.is_watched = True
        print(f'Marked "{self.title}" as watched!')

    def get_summary(self):
        watched = "Watched" if self.is_watched else "Unwatched"
        return f"{self.title} ({self.year}) | Dir: {self.director} | Rating: {self.rating}/10 | {watched}"

m1 = Movie("Inception", "Christopher Nolan", 2010, 8.8)
m2 = Movie("The Matrix", "Wachowski Sisters", 1999, 8.7)
m3 = Movie("Parasite", "Bong Joon-ho", 2019, 8.5)

print(m1.get_summary())
print(m2.get_summary())
print(m3.get_summary())
print()
m1.mark_watched()
print(m1.get_summary())
`,
    xpReward: 30,
    exampleTitle: 'Book from Object Description',
    exampleCode: `# Object Description Table for Book:
# | Name         | Type    | Description                          |
# |--------------|---------|--------------------------------------|
# | title        | String  | The book title                       |
# | author       | String  | Author's full name                   |
# | isbn         | String  | Unique ISBN code                     |
# | page_count   | Integer | Total number of pages                |
# | is_available | Boolean | Whether book is available to borrow  |
# | borrow()     | Method  | Sets is_available to False           |
# | return_book()| Method  | Sets is_available to True            |
# | get_info()   | Method  | Returns a formatted summary string   |

class Book:
    def __init__(self, title, author, isbn, page_count):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.page_count = page_count
        self.is_available = True  # Always starts True

    def borrow(self):
        self.is_available = False
        print(f'"{self.title}" has been borrowed')

    def return_book(self):
        self.is_available = True
        print(f'"{self.title}" has been returned')

    def get_info(self):
        status = "Available" if self.is_available else "Borrowed"
        return f'"{self.title}" by {self.author} | ISBN: {self.isbn} | {self.page_count}pp | {status}'

b1 = Book("Clean Code", "Robert Martin", "978-0132350884", 431)
b2 = Book("Python Crash Course", "Eric Matthes", "978-1718502703", 552)

print(b1.get_info())
print(b2.get_info())
b1.borrow()
print(b1.get_info())
b1.return_book()
`,
  },
  {
    id: 'uml-medium',
    moduleId: 'object-descriptions-uml',
    difficulty: 'medium',
    title: 'Design and Implement: Zoo Management',
    description: 'You are given this design brief: "A zoo management system needs to track animals and their enclosures. Each **Animal** has a name, species, age, and diet type. Each **Enclosure** has a zone name, capacity, and a list of animals. Animals can be added or removed from enclosures. The system must check capacity before adding."\n\nStep 1: On paper (or in comments), create an object description table for both classes.\nStep 2: Implement both classes in Python.\nStep 3: Create 2 enclosures and 4 animals. Demonstrate adding animals, attempting to exceed capacity, and removing an animal.',
    expectedBehavior: 'Both classes implemented. Capacity check works correctly. Adding, removing, and displaying animals functions correctly.',
    hints: [
      'Animal is a simple data class with 4 attributes',
      'Enclosure needs: zone_name, capacity, animals list, and methods to add/remove',
      'add_animal() must check len(self.animals) < self.capacity before adding',
    ],
    starterCode: `# Step 1: Write your object description table in comments
# Animal Object Description Table:
# | Name | Type | Description |
# | ... fill this in ... |

# Enclosure Object Description Table:
# | Name | Type | Description |
# | ... fill this in ... |

# Step 2: Implement the classes

class Animal:
    pass

class Enclosure:
    pass

# Step 3: Create 2 enclosures and 4 animals — test all functionality
`,
    sampleSolution: `# Animal Object Description Table:
# | Name       | Type    | Description                          |
# |------------|---------|--------------------------------------|
# | name       | String  | The animal's name                    |
# | species    | String  | The animal's species                 |
# | age        | Integer | Age in years                         |
# | diet_type  | String  | "carnivore", "herbivore", "omnivore" |
# | get_info() | Method  | Returns a formatted summary          |

# Enclosure Object Description Table:
# | Name            | Type        | Description                          |
# |-----------------|-------------|--------------------------------------|
# | zone_name       | String      | Name of the enclosure zone           |
# | capacity        | Integer     | Maximum number of animals            |
# | animals         | List        | List of Animal objects               |
# | add_animal()    | Method      | Adds an animal if capacity allows    |
# | remove_animal() | Method      | Removes an animal by name            |
# | get_count()     | Method      | Returns number of animals            |
# | display()       | Method      | Displays all enclosure information   |

class Animal:
    def __init__(self, name, species, age, diet_type):
        self.name = name
        self.species = species
        self.age = age
        self.diet_type = diet_type

    def get_info(self):
        return f"{self.name} ({self.species}) | Age: {self.age} | Diet: {self.diet_type}"

class Enclosure:
    def __init__(self, zone_name, capacity):
        self.zone_name = zone_name
        self.capacity = capacity
        self.animals = []

    def add_animal(self, animal):
        if self.get_count() >= self.capacity:
            print(f"Cannot add {animal.name}: {self.zone_name} is at capacity ({self.capacity})")
            return False
        self.animals.append(animal)
        print(f"{animal.name} added to {self.zone_name}")
        return True

    def remove_animal(self, name):
        for animal in self.animals:
            if animal.name == name:
                self.animals.remove(animal)
                print(f"{name} removed from {self.zone_name}")
                return True
        print(f"{name} not found in {self.zone_name}")
        return False

    def get_count(self):
        return len(self.animals)

    def display(self):
        print(f"\\n=== {self.zone_name} ({self.get_count()}/{self.capacity}) ===")
        for animal in self.animals:
            print(f"  {animal.get_info()}")

savanna = Enclosure("Savanna Zone", 3)
aquatic = Enclosure("Aquatic Zone", 2)

lion    = Animal("Simba", "Lion", 5, "carnivore")
giraffe = Animal("Gerald", "Giraffe", 8, "herbivore")
zebra   = Animal("Ziggy", "Zebra", 3, "herbivore")
dolphin = Animal("Flipper", "Dolphin", 6, "carnivore")

savanna.add_animal(lion)
savanna.add_animal(giraffe)
savanna.add_animal(zebra)
savanna.add_animal(dolphin)  # Should fail — at capacity
aquatic.add_animal(dolphin)
savanna.display()
aquatic.display()
savanna.remove_animal("Gerald")
savanna.add_animal(dolphin)
savanna.display()
`,
    xpReward: 50,
    exampleTitle: 'Hospital System from Design Brief',
    exampleCode: `# Design brief: "A hospital system tracks patients and wards.
# Each Patient has an ID, name, condition, and admission date.
# Each Ward has a name, floor number, and maximum beds.
# Patients can be admitted to and discharged from wards."

# Patient Object Description Table:
# | Name           | Type    | Description              |
# |----------------|---------|--------------------------|
# | patient_id     | String  | Unique patient ID        |
# | name           | String  | Patient's full name      |
# | condition      | String  | Medical condition        |
# | admission_date | String  | Date admitted            |
# | get_info()     | Method  | Returns formatted summary|

# Ward Object Description Table:
# | Name            | Type    | Description                    |
# |-----------------|---------|--------------------------------|
# | ward_name       | String  | Name of the ward               |
# | floor           | Integer | Floor number                   |
# | max_beds        | Integer | Maximum patients               |
# | patients        | List    | List of Patient objects        |
# | admit()         | Method  | Admits patient if beds free    |
# | discharge()     | Method  | Discharges patient by ID       |
# | get_occupancy() | Method  | Returns current patient count  |
# | display()       | Method  | Displays ward info             |

class Patient:
    def __init__(self, patient_id, name, condition, admission_date):
        self.patient_id = patient_id
        self.name = name
        self.condition = condition
        self.admission_date = admission_date

    def get_info(self):
        return f"[{self.patient_id}] {self.name} | {self.condition} | Admitted: {self.admission_date}"

class Ward:
    def __init__(self, ward_name, floor, max_beds):
        self.ward_name = ward_name
        self.floor = floor
        self.max_beds = max_beds
        self.patients = []

    def admit(self, patient):
        if self.get_occupancy() >= self.max_beds:
            print(f"Ward {self.ward_name} is full — cannot admit {patient.name}")
            return False
        self.patients.append(patient)
        print(f"{patient.name} admitted to {self.ward_name}")
        return True

    def discharge(self, patient_id):
        for p in self.patients:
            if p.patient_id == patient_id:
                self.patients.remove(p)
                print(f"{p.name} discharged from {self.ward_name}")
                return True
        print(f"Patient {patient_id} not found in {self.ward_name}")
        return False

    def get_occupancy(self):
        return len(self.patients)

    def display(self):
        print(f"\\n=== {self.ward_name} (Floor {self.floor}) — {self.get_occupancy()}/{self.max_beds} beds ===")
        for p in self.patients:
            print(f"  {p.get_info()}")

cardio = Ward("Cardiology", 3, 3)
cardio.admit(Patient("P001", "Aisha Chen", "Hypertension", "2025-03-01"))
cardio.admit(Patient("P002", "Liam Wong", "Arrhythmia", "2025-03-05"))
cardio.admit(Patient("P003", "Mei Park", "Chest pain", "2025-03-07"))
cardio.admit(Patient("P004", "Jordan Lee", "Palpitations", "2025-03-08"))  # Full!
cardio.display()
cardio.discharge("P002")
cardio.display()
`,
  },
  {
    id: 'uml-hard',
    moduleId: 'object-descriptions-uml',
    difficulty: 'hard',
    title: 'Full UML Class Hierarchy Design & Implementation',
    description: 'Design and implement a social media platform with the following requirements:\n\n- A `User` base class with: username, email, join_date, post_count\n- An `AdminUser` that **inherits** `User` and adds: admin_level, permissions list, `grant_permission(perm)`, `revoke_permission(perm)`, `can_do(perm)` method\n- A `Post` class with: post_id (auto-generated), author, content, likes list, `like(username)`, `unlike(username)`, `get_like_count()`\n\nBefore coding: write object description tables for all 3 classes in comments showing the IS-A relationship. Then implement the full hierarchy and demonstrate inheritance, polymorphism (override `display_info()` in AdminUser), and all methods.',
    expectedBehavior: 'Full hierarchy implemented. AdminUser inherits User. Posts auto-generate IDs. All methods work correctly. display_info() overridden in AdminUser.',
    hints: [
      'AdminUser(User) — AdminUser IS-A User',
      'Post uses a class variable _post_counter for auto-generated IDs',
      'display_info() in AdminUser should call super().display_info() then add admin-specific info',
    ],
    starterCode: `# Step 1: Write your object description tables here as comments
# Include the IS-A relationship between User and AdminUser

# User Object Description Table:
# | Name | Type | Description |
# ...

# AdminUser Object Description Table (IS-A User):
# | Name | Type | Description |
# ...

# Post Object Description Table:
# | Name | Type | Description |
# ...

# Step 2: Implement all three classes

class User:
    pass

class AdminUser(User):
    pass

class Post:
    _post_counter = 0
    pass

# Step 3: Demonstrate the full system
# - Create 2 regular users and 1 admin
# - Create 3 posts by different users
# - Demonstrate likes, permissions, and display_info()
`,
    sampleSolution: `# User Object Description Table:
# | Name          | Type    | Description                          |
# |---------------|---------|--------------------------------------|
# | username      | String  | Unique username                      |
# | email         | String  | User email address                   |
# | join_date     | String  | Date account created                 |
# | post_count    | Integer | Number of posts made                 |
# | display_info()| Method  | Displays all user information        |

# AdminUser Object Description Table (IS-A User):
# | Name              | Type    | Description                      |
# |-------------------|---------|----------------------------------|
# | admin_level       | Integer | Admin level (1-3)                |
# | permissions       | List    | List of granted permissions      |
# | grant_permission()| Method  | Adds a permission to the list    |
# | revoke_permission()| Method | Removes a permission             |
# | can_do()          | Method  | Returns True if has permission   |
# | display_info()    | Method  | OVERRIDES User — adds admin info |

# Post Object Description Table:
# | Name          | Type    | Description                          |
# |---------------|---------|--------------------------------------|
# | post_id       | String  | Auto-generated unique ID             |
# | author        | String  | Username of the author               |
# | content       | String  | The post content                     |
# | likes         | List    | Usernames who liked this post        |
# | like()        | Method  | Adds username to likes               |
# | unlike()      | Method  | Removes username from likes          |
# | get_like_count()| Method| Returns number of likes              |
# | display()     | Method  | Prints post with author and likes    |

class User:
    def __init__(self, username, email, join_date):
        self.username = username
        self.email = email
        self.join_date = join_date
        self.post_count = 0

    def display_info(self):
        print(f"User: @{self.username}")
        print(f"  Email:     {self.email}")
        print(f"  Joined:    {self.join_date}")
        print(f"  Posts:     {self.post_count}")

class AdminUser(User):
    def __init__(self, username, email, join_date, admin_level):
        super().__init__(username, email, join_date)
        self.admin_level = admin_level
        self.permissions = []

    def grant_permission(self, perm):
        if perm not in self.permissions:
            self.permissions.append(perm)
            print(f"Granted '{perm}' to @{self.username}")

    def revoke_permission(self, perm):
        if perm in self.permissions:
            self.permissions.remove(perm)
            print(f"Revoked '{perm}' from @{self.username}")
        else:
            print(f"@{self.username} does not have '{perm}'")

    def can_do(self, perm):
        return perm in self.permissions

    def display_info(self):
        super().display_info()  # Inherited info
        print(f"  Admin Lvl: {self.admin_level}")
        print(f"  Perms:     {', '.join(self.permissions) if self.permissions else 'None'}")

class Post:
    _post_counter = 0

    def __init__(self, author, content):
        Post._post_counter += 1
        self.post_id = f"POST-{Post._post_counter:03d}"
        self.author = author
        self.content = content
        self.likes = []

    def like(self, username):
        if username not in self.likes:
            self.likes.append(username)
        else:
            print(f"@{username} already liked this post")

    def unlike(self, username):
        if username in self.likes:
            self.likes.remove(username)

    def get_like_count(self):
        return len(self.likes)

    def display(self):
        print(f"[{self.post_id}] @{self.author}: {self.content}")
        print(f"  {self.get_like_count()} likes: {', '.join(self.likes) if self.likes else 'none'}")

# Demonstration
user1 = User("aisha_codes", "aisha@example.com", "2024-01-15")
user2 = User("liam_dev", "liam@example.com", "2024-03-20")
admin = AdminUser("mod_mei", "mei@platform.com", "2023-06-01", 2)

admin.grant_permission("delete_posts")
admin.grant_permission("ban_users")
admin.revoke_permission("ban_users")
print(f"Can delete posts: {admin.can_do('delete_posts')}")
print(f"Can ban users:    {admin.can_do('ban_users')}")
print()

p1 = Post("aisha_codes", "Just finished my VCE Software Development SAC!")
p2 = Post("liam_dev", "OOP is starting to make sense now")
p3 = Post("mod_mei", "Reminder: follow community guidelines")

p1.like("liam_dev")
p1.like("mod_mei")
p2.like("aisha_codes")

print("=== Posts ===")
p1.display()
p2.display()
p3.display()

print("\\n=== User Profiles ===")
user1.display_info()
print()
admin.display_info()  # Uses overridden method
`,
    xpReward: 80,
    exampleTitle: 'E-Commerce Hierarchy',
    exampleCode: `# User Object Description Table:
# | Name          | Type    | Description             |
# |---------------|---------|-------------------------|
# | user_id       | String  | Unique user ID          |
# | name          | String  | Full name               |
# | email         | String  | Email address           |
# | cart          | List    | Shopping cart items     |
# | add_to_cart() | Method  | Adds item to cart       |
# | display_info()| Method  | Shows user info         |

# PremiumUser Object Description Table (IS-A User):
# | Name              | Type    | Description              |
# |-------------------|---------|--------------------------|
# | discount_rate     | Float   | Discount percentage      |
# | loyalty_points    | Integer | Accumulated points       |
# | add_points()      | Method  | Adds loyalty points      |
# | get_price()       | Method  | Returns discounted price |
# | display_info()    | Method  | OVERRIDES — adds premium info |

class User:
    _counter = 1

    def __init__(self, name, email):
        self.user_id = f"USR-{User._counter:03d}"
        User._counter += 1
        self.name = name
        self.email = email
        self.cart = []

    def add_to_cart(self, item, price):
        self.cart.append({"item": item, "price": price})
        print(f"{self.name} added {item} (\${price:.2f}) to cart")

    def display_info(self):
        print(f"[{self.user_id}] {self.name} | {self.email}")
        print(f"  Cart ({len(self.cart)} items): {[c['item'] for c in self.cart]}")

class PremiumUser(User):
    def __init__(self, name, email, discount_rate=0.1):
        super().__init__(name, email)
        self.discount_rate = discount_rate
        self.loyalty_points = 0

    def add_points(self, points):
        self.loyalty_points += points
        print(f"{self.name} earned {points} points (total: {self.loyalty_points})")

    def get_price(self, original_price):
        return original_price * (1 - self.discount_rate)

    def display_info(self):
        super().display_info()
        print(f"  Premium: {self.discount_rate*100:.0f}% discount | {self.loyalty_points} points")

regular = User("Liam Wong", "liam@email.com")
premium = PremiumUser("Aisha Chen", "aisha@email.com", 0.15)

regular.add_to_cart("Laptop Stand", 59.99)
premium.add_to_cart("Mechanical Keyboard", 129.99)

price = 129.99
discounted = premium.get_price(price)
print(f"Original: \${price:.2f} | Discounted: \${discounted:.2f}")
premium.add_points(130)

print()
regular.display_info()
print()
premium.display_info()
`,
  },
];

export function getChallengesForModule(moduleId: string): CodingChallenge[] {
  return CODING_CHALLENGES.filter(c => c.moduleId === moduleId);
}
