import { OOPModule } from '../types';

export const MODULES: OOPModule[] = [
  {
    id: 'classes-objects',
    number: 1,
    title: 'Classes & Objects',
    subtitle: 'Blueprints and Instances',
    icon: '🏗️',
    color: '#00FF41',
    description: 'Understand the fundamental building blocks of OOP — classes as blueprints and objects as instances.',
    keyTerms: ['class', 'object', 'instance', 'blueprint', 'instantiation', 'template'],
    sections: [
      {
        type: 'definition',
        title: 'VCAA Definition',
        content: `A **class** is a blueprint or template that defines the attributes (data) and methods (behaviours) that objects of that type will have.\n\nAn **object** is a specific instance of a class, created using the class blueprint, with its own unique set of attribute values.\n\nKey distinction: A class **DEFINES** — an object **EXISTS**. The class is not an object; it is the template for creating objects.`,
      },
      {
        type: 'analogy',
        title: 'The Cookie Cutter Analogy',
        content: `Think of a class like a **cookie cutter**. The cookie cutter (class) defines the shape, but each cookie you stamp out (object) is a separate, independent cookie. You can decorate each cookie differently (different attribute values), but they all share the same basic shape (structure defined by the class).\n\nThe cookie cutter is NOT a cookie — it's the template for making cookies. Similarly, a class is NOT an object — it's the template for creating objects.\n\n**Another Analogy — Student ID Cards:**\nYour school has a template for student ID cards (the class). Every student gets their own card (object) with their own name, photo, and student number (attribute values). The template defines WHAT information goes on the card. Each card is a unique instance.`,
      },
      {
        type: 'code',
        title: 'Python Code Example',
        language: 'python',
        content: `class Student:
    """A class representing a VCE student."""

    def __init__(self, name, student_id, year_level):
        """Constructor: initialises a new Student object."""
        self.name = name              # Attribute: student's name
        self.student_id = student_id  # Attribute: unique ID
        self.year_level = year_level  # Attribute: year level
        self.subjects = []            # Attribute: list of subjects

    def enrol_subject(self, subject):
        """Method: adds a subject to the student's list."""
        self.subjects.append(subject)
        print(f"{self.name} enrolled in {subject}")

    def display_info(self):
        """Method: displays the student's information."""
        print(f"Name: {self.name}")
        print(f"ID: {self.student_id}")
        print(f"Year: {self.year_level}")
        print(f"Subjects: {', '.join(self.subjects)}")

# Creating objects (instances) of the Student class
student1 = Student("Aisha", "STU001", 12)
student2 = Student("Liam", "STU002", 12)

# Using methods on objects
student1.enrol_subject("Software Development")
student1.enrol_subject("Methods")
student1.display_info()`,
      },
      {
        type: 'pseudocode',
        title: 'VCAA Pseudocode Equivalent',
        language: 'text',
        content: `CLASS Student
    ATTRIBUTES:
        name: String
        studentID: String
        yearLevel: Integer
        subjects: List of String

    CONSTRUCTOR(name, studentID, yearLevel)
        SET this.name TO name
        SET this.studentID TO studentID
        SET this.yearLevel TO yearLevel
        SET this.subjects TO empty list
    END CONSTRUCTOR

    METHOD enrolSubject(subject)
        APPEND subject TO this.subjects
        DISPLAY name + " enrolled in " + subject
    END METHOD

    METHOD displayInfo()
        DISPLAY "Name: " + this.name
        DISPLAY "ID: " + this.studentID
    END METHOD
END CLASS

// Creating objects
student1 = NEW Student("Aisha", "STU001", 12)
student1.enrolSubject("Software Development")
student1.displayInfo()`,
      },
      {
        type: 'exam_tip',
        title: 'VCE Exam Tip',
        content: `In VCE exams, you may be asked to "identify the class and its objects" from a scenario, or to "describe the relationship between a class and an object."\n\nAlways use the terms:\n- **blueprint/template** for class\n- **instance** for object\n\nRemember: a class DEFINES, an object EXISTS.\n\nCommon exam question: "Given the code \`car1 = Car("Toyota", "Camry")\`, identify the class and the object."\n→ Class: **Car** | Object: **car1**`,
      },
    ],
  },
  {
    id: 'attributes-methods',
    number: 2,
    title: 'Attributes & Methods',
    subtitle: 'Data and Behaviour',
    icon: '⚙️',
    color: '#00D4FF',
    description: 'Learn how attributes store an object\'s state and methods define its behaviours.',
    keyTerms: ['attribute', 'method', 'instance variable', 'property', 'behaviour', 'getter', 'setter'],
    sections: [
      {
        type: 'definition',
        title: 'VCAA Definition',
        content: `**Attributes** (also called properties or instance variables) are the data stored within an object — they represent the object's state or characteristics.\n\n**Methods** are functions defined within a class that describe the behaviours or actions an object can perform. They define WHAT the object can do.\n\nKey distinction:\n- Attributes = WHAT the object **IS** (state/data)\n- Methods = WHAT the object **DOES** (behaviour/actions)`,
      },
      {
        type: 'analogy',
        title: 'The Smartphone Analogy',
        content: `Your phone (object) has **attributes**: brand = "Samsung", colour = "black", storage = 256, batteryLevel = 87.\n\nIt also has **methods** (things it can do): makeCall(), sendText(), takePhoto(), chargeBattery().\n\n- Attributes describe WHAT the phone IS\n- Methods describe WHAT the phone DOES\n\nIf you picked up someone else's identical phone model, the attributes (brand, model) would be the same, but their specific values (batteryLevel, photos) would be different — just like different objects of the same class have different attribute values.`,
      },
      {
        type: 'code',
        title: 'Python Code Example',
        language: 'python',
        content: `class BankAccount:
    """Represents a simple bank account."""

    def __init__(self, owner, balance=0.0):
        self.owner = owner          # Attribute
        self.balance = balance      # Attribute
        self.transactions = []      # Attribute

    def deposit(self, amount):      # Method
        """Adds money to the account."""
        if amount > 0:
            self.balance += amount
            self.transactions.append(f"Deposited \${amount:.2f}")
            return True
        return False

    def withdraw(self, amount):     # Method
        """Removes money if sufficient funds exist."""
        if 0 < amount <= self.balance:
            self.balance -= amount
            self.transactions.append(f"Withdrew \${amount:.2f}")
            return True
        return False

    def get_balance(self):          # Method (accessor/getter)
        """Returns the current balance."""
        return self.balance

    def display_history(self):      # Method
        """Prints all transactions."""
        print(f"Account: {self.owner}")
        for t in self.transactions:
            print(f"  {t}")

account = BankAccount("Mei Chen", 1000.0)
account.deposit(500)
account.withdraw(200)
account.display_history()
print(f"Balance: \${account.get_balance():.2f}")`,
      },
      {
        type: 'pseudocode',
        title: 'VCAA Pseudocode',
        language: 'text',
        content: `CLASS BankAccount
    ATTRIBUTES:
        owner: String
        balance: Float
        transactions: List of String

    CONSTRUCTOR(owner, balance)
        SET this.owner TO owner
        SET this.balance TO balance
        SET this.transactions TO empty list
    END CONSTRUCTOR

    METHOD deposit(amount)
        IF amount > 0 THEN
            SET this.balance TO this.balance + amount
            APPEND "Deposited \$" + amount TO this.transactions
            RETURN True
        ENDIF
        RETURN False
    END METHOD

    METHOD withdraw(amount)
        IF amount > 0 AND amount <= this.balance THEN
            SET this.balance TO this.balance - amount
            RETURN True
        ENDIF
        RETURN False
    END METHOD

    METHOD getBalance()
        RETURN this.balance
    END METHOD
END CLASS`,
      },
      {
        type: 'exam_tip',
        title: 'VCE Exam Tip',
        content: `When a VCAA question shows a **UML class diagram**, remember:\n\n- **Top section** → Class name\n- **Middle section** → Attributes (with data types)\n- **Bottom section** → Methods (with parameters and return types)\n\nBe able to read and interpret UML diagrams. You may be asked to:\n1. "List the attributes of the class"\n2. "Identify which method calculates the total"\n3. "Write pseudocode for the withdraw() method"\n\nIn object description tables, always include: Name, Type, and Description columns.`,
      },
    ],
  },
  {
    id: 'constructors',
    number: 3,
    title: 'Constructors',
    subtitle: 'The __init__ Method',
    icon: '🔧',
    color: '#FFB800',
    description: 'Discover how constructors initialise objects and set their starting state when created.',
    keyTerms: ['constructor', '__init__', 'initialise', 'instantiation', 'default value', 'parameter'],
    sections: [
      {
        type: 'definition',
        title: 'VCAA Definition',
        content: `A **constructor** is a special method that is automatically called when a new object is created (instantiated). In Python, the constructor is the \`__init__\` method.\n\nThe constructor's purpose is to **initialise the object's attributes** with starting values, ensuring every object begins in a valid and consistent state.\n\nKey points:\n- Automatically called at object creation (you never call it manually)\n- Sets up initial attribute values\n- Can have required and optional (default) parameters\n- In Python: always named \`__init__\``,
      },
      {
        type: 'analogy',
        title: 'The Birth Certificate Analogy',
        content: `When a baby is born, certain information is immediately recorded: name, date of birth, parents' names, weight. This is like the constructor — it sets up the **initial state** of the new "person object" at the moment of creation. You can't have a person without these initial details being set.\n\n**Another Analogy — New Game Save:**\nWhen you start a new game, the constructor sets your initial values:\n- health = 100\n- level = 1\n- score = 0\n- lives = 3\n\nThese defaults ensure every new player starts in a valid state. Different games (different classes) might initialise differently, but every new save file (object) of that game starts the same way.`,
      },
      {
        type: 'code',
        title: 'Python Code Example',
        language: 'python',
        content: `class VCEStudent:
    """A VCE student demonstrating constructors."""

    def __init__(self, name, student_id, study_score=0):
        """
        Constructor with required and optional parameters.
        Args:
            name (str): Student's full name (required)
            student_id (str): Unique student ID (required)
            study_score (int): Initial study score, defaults to 0
        """
        self.name = name                    # Required attribute
        self.student_id = student_id        # Required attribute
        self.study_score = study_score      # Optional with default
        self.sac_results = []               # Always starts empty
        self.is_enrolled = True             # Always starts True

    def add_sac(self, mark):
        """Records a SAC result."""
        self.sac_results.append(mark)
        print(f"SAC recorded for {self.name}: {mark}%")

    def display(self):
        """Displays student information."""
        print(f"Student: {self.name} ({self.student_id})")
        print(f"Enrolled: {self.is_enrolled}")
        print(f"SAC Results: {self.sac_results}")

# Constructor called automatically when creating objects
student1 = VCEStudent("Mei Chen", "VCE2025-042")
student2 = VCEStudent("Jordan Smith", "VCE2025-099", study_score=35)

# After construction:
# student1.name = "Mei Chen", study_score = 0, sac_results = []
# student2.name = "Jordan Smith", study_score = 35, sac_results = []

student1.add_sac(78)
student1.display()`,
      },
      {
        type: 'pseudocode',
        title: 'VCAA Pseudocode',
        language: 'text',
        content: `CLASS VCEStudent
    ATTRIBUTES:
        name: String
        studentID: String
        studyScore: Integer
        sacResults: List of Integer
        isEnrolled: Boolean

    CONSTRUCTOR(name, studentID, studyScore)
        SET this.name TO name
        SET this.studentID TO studentID
        SET this.studyScore TO studyScore
        SET this.sacResults TO empty list
        SET this.isEnrolled TO True
    END CONSTRUCTOR

    METHOD addSAC(mark)
        APPEND mark TO this.sacResults
        DISPLAY "SAC recorded for " + this.name + ": " + mark + "%"
    END METHOD
END CLASS

// Instantiating objects — constructor called automatically
student1 = NEW VCEStudent("Mei Chen", "VCE2025-042", 0)
student1.addSAC(78)`,
      },
      {
        type: 'exam_tip',
        title: 'VCE Exam Tip',
        content: `VCAA may ask: **"What is the purpose of a constructor?"**\n\nModel answer: *"A constructor is a special method that initialises the attributes of an object when it is first created (instantiated). It ensures the object starts in a valid and consistent state."*\n\nYou may also be asked to:\n- "Complete the constructor for the following class"\n- "Identify the constructor in this code snippet"\n- "Explain what happens when this object is created"\n\nRemember: In Python, the constructor is ALWAYS named \`__init__\`. In pseudocode, it is shown as CONSTRUCTOR.`,
      },
    ],
  },
  {
    id: 'encapsulation',
    number: 4,
    title: 'Encapsulation',
    subtitle: 'Data Protection & Controlled Access',
    icon: '🔒',
    color: '#FF4444',
    description: 'Master the principle of bundling data and protecting it through controlled access methods.',
    keyTerms: ['encapsulation', 'private', 'public', 'getter', 'setter', 'data hiding', 'access modifier', 'validation'],
    sections: [
      {
        type: 'definition',
        title: 'VCAA Definition',
        content: `**Encapsulation** is the OOP principle of:\n1. **Bundling** data (attributes) and the methods that operate on that data together within a class\n2. **Restricting** direct access to some of the object's components\n\nThis protects the internal state of an object from unintended interference. Data is accessed and modified only through controlled methods (getters and setters), which can include validation.\n\nIn Python:\n- Single underscore \_name → convention for "protected" (not strictly enforced)\n- Double underscore \_\_name → name mangling, makes attribute harder to access externally`,
      },
      {
        type: 'analogy',
        title: 'The Vending Machine Analogy',
        content: `You interact with a vending machine through **buttons and a coin slot** (public methods). You **can't reach inside** and grab snacks or rearrange the internal mechanisms (private attributes).\n\nThe machine controls HOW you interact with it. You press B4, insert $3.50, and out comes your snack. You don't need to know HOW the internal mechanisms work — and you CAN'T bypass them.\n\n**That's encapsulation.**\n\n**Another Analogy — Your Phone's Battery:**\nYou can check your battery percentage (getter method) and charge your phone (setter method), but you can't directly manipulate the battery's voltage or chemical composition (private attributes). The phone encapsulates its internal workings.`,
      },
      {
        type: 'code',
        title: 'Python Code Example',
        language: 'python',
        content: `class StudentRecord:
    """Demonstrates encapsulation with private attributes."""

    def __init__(self, name, student_id):
        self.__name = name              # Private attribute
        self.__student_id = student_id  # Private attribute
        self.__grades = []              # Private attribute
        self.__gpa = 0.0                # Private attribute

    # Getter method — controlled READ access
    def get_name(self):
        """Returns the student's name."""
        return self.__name

    def get_gpa(self):
        """Returns the calculated GPA."""
        return self.__gpa

    # Setter method with VALIDATION — controlled WRITE access
    def add_grade(self, grade):
        """Adds a grade — only accepts 0-100."""
        if 0 <= grade <= 100:
            self.__grades.append(grade)
            self.__calculate_gpa()  # Auto-recalculate
            return True
        else:
            print("Error: Grade must be between 0 and 100")
            return False

    # Private method — internal use only
    def __calculate_gpa(self):
        """Cannot be called from outside the class."""
        if self.__grades:
            self.__gpa = sum(self.__grades) / len(self.__grades)

# Usage
record = StudentRecord("Jordan", "STU100")
record.add_grade(85)      # Works — uses public method with validation
record.add_grade(150)     # Rejected — validation catches invalid data
# record.__grades          # AttributeError — can't access private attribute
print(f"GPA: {record.get_gpa():.1f}")   # Works — uses getter`,
      },
      {
        type: 'pseudocode',
        title: 'VCAA Pseudocode',
        language: 'text',
        content: `CLASS StudentRecord
    PRIVATE ATTRIBUTES:
        name: String
        studentID: String
        grades: List of Integer
        gpa: Float

    PUBLIC METHOD getName()
        RETURN this.name
    END METHOD

    PUBLIC METHOD getGPA()
        RETURN this.gpa
    END METHOD

    PUBLIC METHOD addGrade(grade)
        IF grade >= 0 AND grade <= 100 THEN
            APPEND grade TO this.grades
            CALL this.calculateGPA()
            RETURN True
        ELSE
            DISPLAY "Error: Grade must be between 0 and 100"
            RETURN False
        ENDIF
    END METHOD

    PRIVATE METHOD calculateGPA()
        IF LENGTH(this.grades) > 0 THEN
            SET this.gpa TO SUM(this.grades) / LENGTH(this.grades)
        ENDIF
    END METHOD
END CLASS`,
      },
      {
        type: 'exam_tip',
        title: 'VCE Exam Tip — HIGH PRIORITY',
        content: `VCAA LOVES testing encapsulation. The 2025 sample exam included:\n\n*"The OOP principle that protects a variable by ensuring it can only be accessed by methods is best described as:*\n*(A) Generalisation (B) Encapsulation (C) Inheritance (D) Abstraction"*\n\n**Answer: B — Encapsulation**\n\nWhen explaining encapsulation in short-answer questions, always mention:\n1. Hiding internal data (private attributes)\n2. Using getters and setters for controlled access\n3. Validation in setters to protect data integrity\n\n**Key distinction:** Encapsulation ≠ Abstraction\n- Encapsulation = DATA PROTECTION (hiding attributes)\n- Abstraction = COMPLEXITY HIDING (hiding implementation)`,
      },
    ],
  },
  {
    id: 'inheritance',
    number: 5,
    title: 'Inheritance',
    subtitle: 'Code Reuse & Class Hierarchies',
    icon: '🌳',
    color: '#00FF41',
    description: 'Explore how child classes inherit attributes and methods from parent classes to promote code reuse.',
    keyTerms: ['inheritance', 'parent class', 'child class', 'superclass', 'subclass', 'super()', 'override', 'IS-A relationship'],
    sections: [
      {
        type: 'definition',
        title: 'VCAA Definition',
        content: `**Inheritance** is the OOP principle where a new class (child/subclass) is created based on an existing class (parent/superclass), **inheriting all its attributes and methods**.\n\nThe child class can then:\n- **Add** new attributes and methods (extend the parent)\n- **Override** existing methods (change the parent's behaviour)\n\nThis promotes **code reuse** and establishes a hierarchical "IS-A" relationship between classes.\n\nKey terminology:\n- Parent class / Superclass → the class being inherited FROM\n- Child class / Subclass → the class that INHERITS\n- A Dog IS-A Animal (Dog inherits from Animal)`,
      },
      {
        type: 'analogy',
        title: 'The Family Traits Analogy',
        content: `Children inherit traits from their parents — eye colour, height tendency, hair type. But children are also their own person with unique traits.\n\nA child class inherits from a parent class in the same way:\n- A \`SportsCar\` inherits everything a \`Car\` has (wheels, engine, steering) but adds its own special features (turbo boost, sport mode)\n\n**Another Analogy — School Hierarchy:**\n- All \`Person\` objects have: name, age\n- A \`Student\` IS-A \`Person\` → inherits name and age, PLUS adds studentID, yearLevel\n- A \`Teacher\` IS-A \`Person\` → inherits name and age, PLUS adds employeeID, subjects\n\nThe \`Person\` class is the parent; \`Student\` and \`Teacher\` are children.`,
      },
      {
        type: 'code',
        title: 'Python Code Example',
        language: 'python',
        content: `class Vehicle:
    """Parent class representing a generic vehicle."""

    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.is_running = False

    def start(self):
        self.is_running = True
        print(f"{self.make} {self.model} started")

    def stop(self):
        self.is_running = False
        print(f"{self.make} {self.model} stopped")

    def describe(self):
        return f"{self.year} {self.make} {self.model}"


class ElectricCar(Vehicle):  # ElectricCar INHERITS Vehicle
    """Child class with new attributes and overridden method."""

    def __init__(self, make, model, year, battery_capacity):
        super().__init__(make, model, year)  # Call parent constructor
        self.battery_capacity = battery_capacity  # NEW attribute
        self.charge_level = 100                   # NEW attribute

    def charge(self):  # NEW method
        """New method specific to ElectricCar."""
        self.charge_level = 100
        print(f"{self.make} {self.model} fully charged!")

    def describe(self):  # OVERRIDDEN method
        """Overrides parent describe() with additional info."""
        base = super().describe()
        return f"{base} (Electric, {self.battery_capacity}kWh, {self.charge_level}% charge)"


my_car = ElectricCar("Tesla", "Model 3", 2024, 75)
my_car.start()            # Inherited from Vehicle
my_car.charge()           # New method in ElectricCar
print(my_car.describe())  # Overridden method`,
      },
      {
        type: 'pseudocode',
        title: 'VCAA Pseudocode',
        language: 'text',
        content: `CLASS Vehicle
    ATTRIBUTES:
        make: String
        model: String
        year: Integer
        isRunning: Boolean

    METHOD start()
        SET this.isRunning TO True
        DISPLAY this.make + " " + this.model + " started"
    END METHOD

    METHOD describe()
        RETURN this.year + " " + this.make + " " + this.model
    END METHOD
END CLASS

CLASS ElectricCar INHERITS Vehicle
    ATTRIBUTES:
        batteryCapacity: Integer
        chargeLevel: Integer

    CONSTRUCTOR(make, model, year, batteryCapacity)
        CALL SUPER(make, model, year)
        SET this.batteryCapacity TO batteryCapacity
        SET this.chargeLevel TO 100
    END CONSTRUCTOR

    METHOD charge()
        SET this.chargeLevel TO 100
        DISPLAY this.make + " " + this.model + " fully charged!"
    END METHOD

    METHOD describe()   // OVERRIDES parent method
        RETURN SUPER.describe() + " (Electric, " + this.batteryCapacity + "kWh)"
    END METHOD
END CLASS`,
      },
      {
        type: 'exam_tip',
        title: 'VCE Exam Tip — DIRECTLY FROM SAMPLE EXAM',
        content: `The 2025 VCAA sample exam showed a UML class diagram with an arrow from \`Moderator\` to \`User\` and asked:\n\n*"State which principle of OOP is represented by the arrow."*\n\n**Answer: Inheritance**\n\nThe arrow in a UML class diagram pointing from child to parent indicates that the child class inherits from the parent class.\n\nAlways use the phrase **"IS-A relationship"** when describing inheritance:\n- "A Moderator IS-A User"\n- "An ElectricCar IS-A Vehicle"\n\nAlso be able to state: "The Moderator class inherits all attributes and methods of the User class and can add its own."`,
      },
    ],
  },
  {
    id: 'abstraction',
    number: 6,
    title: 'Abstraction',
    subtitle: 'Hiding Complexity',
    icon: '🎭',
    color: '#00D4FF',
    description: 'Learn how abstraction simplifies complex systems by exposing only essential features.',
    keyTerms: ['abstraction', 'interface', 'implementation', 'complexity hiding', 'public interface', 'private implementation'],
    sections: [
      {
        type: 'definition',
        title: 'VCAA Definition',
        content: `**Abstraction** is the OOP principle of simplifying complex systems by **showing only the essential features** to the user while **hiding unnecessary implementation details**.\n\nAbstraction focuses on WHAT an object does rather than HOW it does it.\n\nKey aspects:\n- Provides a **simple interface** for complex operations\n- Hides implementation complexity in private methods\n- Users interact with the "what", not the "how"\n- Reduces cognitive load — you don't need to understand the internals`,
      },
      {
        type: 'analogy',
        title: 'The Car Dashboard Analogy',
        content: `When you drive a car, you use the steering wheel, accelerator, and brake pedals (the **abstracted interface**). You don't need to understand:\n- How the engine combustion cycle works\n- How the transmission converts rotational force\n- How the ABS braking system calculates wheel slip\n\nThe complexity is hidden — you just interact with the simplified interface.\n\n**Another Analogy — TV Remote:**\nYou press "Volume Up" and the volume increases. You don't know (or need to know) that the remote sends an infrared signal encoded with a specific protocol decoded by the TV's receiver chip.\n\nThe button IS the abstraction. Simple interface, complex hidden implementation.`,
      },
      {
        type: 'code',
        title: 'Python Code Example',
        language: 'python',
        content: `class EmailService:
    """Demonstrates abstraction — simple interface hides complexity."""

    def __init__(self, server_address):
        self.__server = server_address
        self.__connection = None
        self.__authenticated = False

    # SIMPLE PUBLIC INTERFACE — what users interact with
    def send_email(self, to, subject, body):
        """One simple method — hides ALL complexity below."""
        self.__connect()
        self.__authenticate()
        self.__format_message(to, subject, body)
        self.__transmit()
        self.__disconnect()
        print(f"Email sent to {to}!")

    # COMPLEX HIDDEN IMPLEMENTATION — private methods
    def __connect(self):
        """Hidden: Establishes server connection."""
        self.__connection = f"Connected to {self.__server}"

    def __authenticate(self):
        """Hidden: Handles authentication protocol."""
        self.__authenticated = True

    def __format_message(self, to, subject, body):
        """Hidden: Formats message with headers and encoding."""
        pass  # Complex MIME formatting hidden here

    def __transmit(self):
        """Hidden: Sends data packets across network."""
        pass  # Complex network transmission hidden here

    def __disconnect(self):
        """Hidden: Closes server connection gracefully."""
        self.__connection = None

# User only needs ONE simple method:
email = EmailService("mail.school.vic.edu.au")
email.send_email("teacher@school.vic.edu.au", "SAT Progress", "Here is my update...")
# No knowledge of SMTP, MIME, TLS, authentication needed!`,
      },
      {
        type: 'exam_tip',
        title: 'VCE Exam Tip — Encapsulation vs Abstraction',
        content: `Students frequently confuse abstraction and encapsulation. Here's the key distinction:\n\n**Encapsulation** = DATA PROTECTION\n- Hiding attributes (private variables)\n- Using getters and setters with validation\n- Focus: "What data can you access?"\n\n**Abstraction** = COMPLEXITY HIDING\n- Showing a simple interface\n- Hiding how complex operations work internally\n- Focus: "What do you need to know to use this?"\n\n**Memory trick:**\n- Encapsulation = what you CAN'T touch (the data)\n- Abstraction = what you DON'T NEED to see (the implementation)\n\nBoth use private methods/attributes in Python, but for different reasons.`,
      },
    ],
  },
  {
    id: 'polymorphism',
    number: 7,
    title: 'Polymorphism',
    subtitle: 'Many Forms, One Interface',
    icon: '🔀',
    color: '#FFB800',
    description: 'Explore how the same method name can behave differently across different classes.',
    keyTerms: ['polymorphism', 'method overriding', 'common interface', 'many forms', 'override', 'dynamic dispatch'],
    sections: [
      {
        type: 'definition',
        title: 'VCAA Definition',
        content: `**Polymorphism** (meaning "many forms") is the OOP principle where:\n1. Objects of **different classes** can be treated as objects of a **common parent class**\n2. The **same method name** can behave differently depending on which class's object is calling it\n\nThis allows a single interface to represent different underlying behaviours.\n\nKey aspects:\n- Same method name → different implementations\n- Objects processed through a common interface\n- Behaviour determined by the actual object type at runtime`,
      },
      {
        type: 'analogy',
        title: 'The Play Button Analogy',
        content: `The "Play" button appears on your music app, Netflix, YouTube, and podcast app. It's the **same concept** (play), but each app plays something different:\n- Music app → plays a song\n- Netflix → plays a film\n- Podcast app → plays an audio episode\n\nSame interface, different behaviour. That's polymorphism.\n\n**Another Analogy — Animal Sounds:**\n- Tell a Dog to \`speak()\` → it barks\n- Tell a Cat to \`speak()\` → it meows  \n- Tell a Duck to \`speak()\` → it quacks\n\nSame method name (\`speak\`), different implementation depending on the object type.`,
      },
      {
        type: 'code',
        title: 'Python Code Example',
        language: 'python',
        content: `import math

class Shape:
    """Parent class with method that child classes will override."""

    def __init__(self, name):
        self.name = name

    def calculate_area(self):
        """Base method — overridden by each child class."""
        return 0

    def describe(self):
        return f"{self.name}: area = {self.calculate_area():.2f}"


class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height

    def calculate_area(self):  # Same name, different implementation
        return self.width * self.height


class Circle(Shape):
    def __init__(self, radius):
        super().__init__("Circle")
        self.radius = radius

    def calculate_area(self):  # Same name, different implementation
        return math.pi * self.radius ** 2


class Triangle(Shape):
    def __init__(self, base, height):
        super().__init__("Triangle")
        self.base = base
        self.height = height

    def calculate_area(self):  # Same name, different implementation
        return 0.5 * self.base * self.height


# POLYMORPHISM IN ACTION — treating all shapes through same interface
shapes = [Rectangle(5, 3), Circle(4), Triangle(6, 8)]

for shape in shapes:
    print(shape.describe())  # Same method call, different results!

# Output:
# Rectangle: area = 15.00
# Circle: area = 50.27
# Triangle: area = 24.00`,
      },
      {
        type: 'pseudocode',
        title: 'VCAA Pseudocode',
        language: 'text',
        content: `CLASS Shape
    ATTRIBUTES:
        name: String

    METHOD calculateArea()
        RETURN 0
    END METHOD
END CLASS

CLASS Rectangle INHERITS Shape
    ATTRIBUTES:
        width: Float
        height: Float

    METHOD calculateArea()  // OVERRIDES parent
        RETURN this.width * this.height
    END METHOD
END CLASS

CLASS Circle INHERITS Shape
    ATTRIBUTES:
        radius: Float

    METHOD calculateArea()  // OVERRIDES parent
        RETURN 3.14159 * this.radius * this.radius
    END METHOD
END CLASS

// Polymorphism: processing different objects through common interface
shapes = [NEW Rectangle(5, 3), NEW Circle(4), NEW Triangle(6, 8)]
FOR EACH shape IN shapes DO
    DISPLAY shape.name + ": area = " + shape.calculateArea()
END FOR`,
      },
      {
        type: 'exam_tip',
        title: 'VCE Exam Tip',
        content: `When a VCAA question asks you to **"describe polymorphism"**, always mention:\n1. **Same method name** across different classes\n2. **Different implementations/behaviours** in each class\n3. Allows objects to be **treated through a common interface**\n\nUse a concrete example in your answer.\n\nModel answer: *"Polymorphism allows different classes (such as Rectangle and Circle) to each implement a method with the same name (calculateArea()), but with different behaviour appropriate to their type. This allows objects of different classes to be processed through a single common interface."*\n\nCommon exam scenario: A list of different shape objects being processed in a loop using the same method — the correct area formula is automatically applied.`,
      },
    ],
  },
  {
    id: 'object-descriptions-uml',
    number: 8,
    title: 'Object Descriptions & UML',
    subtitle: 'VCAA Design Tools',
    icon: '📐',
    color: '#00FF41',
    description: 'Master VCAA design tools — object description tables and UML class diagrams.',
    keyTerms: ['object description', 'UML', 'class diagram', 'attribute table', 'design tool', 'notation', 'access modifier'],
    sections: [
      {
        type: 'definition',
        title: 'VCAA Definition',
        content: `**Object descriptions** are a VCAA design tool that documents the properties and behaviours of objects in a solution, typically as a table with columns for Name, Type, and Description.\n\n**UML (Unified Modelling Language) Class Diagrams** visually represent classes, their attributes, methods, and relationships (such as inheritance).\n\nThese are key design tools used BEFORE writing code — they document and communicate software design to stakeholders.`,
      },
      {
        type: 'analogy',
        title: 'Reading a UML Class Diagram',
        content: `A UML class diagram has three sections:\n\n\`\`\`\n┌─────────────────────┐\n│      ClassName       │  ← Class name (top)\n├─────────────────────┤\n│ - attribute1: Type   │  ← Attributes (middle)\n│ - attribute2: Type   │     - = private  + = public\n├─────────────────────┤\n│ + method1(): Type    │  ← Methods (bottom)\n│ + method2(param)     │\n└─────────────────────┘\n\`\`\`\n\n**Arrows in UML:**\n- Solid line with hollow arrowhead → **Inheritance** (child points TO parent)\n- Dashed line → Dependency\n- Diamond line → Composition/Aggregation\n\nThe inheritance arrow always goes from the **child class to the parent class**.`,
      },
      {
        type: 'table',
        title: 'Object Description Table Example',
        content: `Object Description Table for a Student class:\n\n| Object Name | Type | Description |\n|---|---|---|\n| studentName | String | Stores the full name of the student |\n| studentID | String | Unique identifier (e.g., "STU001") |\n| yearLevel | Integer | The student's current year level (7-12) |\n| subjects | List of String | Collection of enrolled subjects |\n| isEnrolled | Boolean | Indicates if the student is currently enrolled |\n| enrolSubject() | Method | Adds a new subject to the subject list |\n| getGPA() | Method | Calculates and returns the student's GPA |\n| displayInfo() | Method | Prints all student information to the screen |`,
      },
      {
        type: 'code',
        title: 'Python Implementation from UML/Object Description',
        language: 'python',
        content: `class Student:
    """
    Implemented from the object description table above.
    Attributes match the table exactly.
    """

    def __init__(self, student_name, student_id, year_level):
        self.student_name = student_name    # String
        self.student_id = student_id        # String
        self.year_level = year_level        # Integer
        self.subjects = []                  # List of String
        self.is_enrolled = True             # Boolean
        self.__grades = []                  # Private — not in public table

    def enrol_subject(self, subject):       # Method from table
        """Adds a new subject to the subject list."""
        self.subjects.append(subject)

    def get_gpa(self):                      # Method from table
        """Calculates and returns the student's GPA."""
        if self.__grades:
            return sum(self.__grades) / len(self.__grades)
        return 0.0

    def display_info(self):                 # Method from table
        """Prints all student information."""
        print(f"Name: {self.student_name}")
        print(f"ID: {self.student_id}")
        print(f"Year Level: {self.year_level}")
        print(f"Subjects: {', '.join(self.subjects)}")
        print(f"Enrolled: {self.is_enrolled}")
        print(f"GPA: {self.get_gpa():.2f}")`,
      },
      {
        type: 'exam_tip',
        title: 'VCE Exam Tip — Design Tools Context',
        content: `VCAA distinguishes between three types of design documentation:\n\n1. **Mock-ups** → Visual design of the USER INTERFACE\n2. **Pseudocode** → Algorithm LOGIC and structure\n3. **Object descriptions** → DATA and METHOD documentation for OOP\n\nKnow the purpose of each and don't confuse them!\n\nIn the exam, you may be asked to:\n- "Complete the object description table for this class"\n- "Draw a UML class diagram showing the relationship between User and Moderator"\n- "Identify the access modifiers shown in the UML diagram"\n\nRemember: In UML, **+** means public and **-** means private. The inheritance arrow points FROM the child TO the parent class.`,
      },
    ],
  },
];
