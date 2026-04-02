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
];

export function getChallengesForModule(moduleId: string): CodingChallenge[] {
  return CODING_CHALLENGES.filter(c => c.moduleId === moduleId);
}
