import { motion } from 'framer-motion';

function ClassesObjectsAnim() {
  const objects = ['alex', 'priya', 'kai'];
  return (
    <div className="flex items-center justify-between gap-6 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-shrink-0"
      >
        <div className="border-2 border-dashed border-[#00FF41]/50 rounded-xl p-4 w-36 bg-[#00FF41]/5">
          <p className="text-[#00FF41] font-mono text-[10px] uppercase mb-2 text-center">CLASS</p>
          <p className="text-[#E0E0E0] font-display font-bold text-center text-sm">Student</p>
          <div className="mt-2 space-y-1">
            {['name', 'id', 'year'].map(a => (
              <p key={a} className="text-[#888] font-mono text-[10px] text-center">· {a}</p>
            ))}
          </div>
          <div className="mt-2 border-t border-[#1a1a1a] pt-2 space-y-1">
            {['enrol()', 'get_info()'].map(m => (
              <p key={m} className="text-[#00FF41]/60 font-mono text-[10px] text-center">{m}</p>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
            className="h-px w-10 bg-[#555] origin-left"
          />
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[#888] font-mono text-[9px] mt-1"
        >instantiate</motion.p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {objects.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.2, type: 'spring', stiffness: 200 }}
            className="border border-[#FFB800]/30 bg-[#FFB800]/5 rounded-lg px-3 py-2 flex items-center gap-3"
          >
            <span className="text-[#FFB800] font-mono text-[10px] uppercase flex-shrink-0">obj</span>
            <span className="text-[#E0E0E0] font-mono text-xs">{name} = Student(...)</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AttributesMethodsAnim() {
  return (
    <div className="flex gap-6 px-4 justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 max-w-[160px]"
      >
        <div className="border border-[#00D4FF]/30 rounded-xl overflow-hidden">
          <div className="bg-[#00D4FF]/10 px-3 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
            <span className="text-[#00D4FF] font-mono text-[10px] uppercase">Attributes</span>
          </div>
          <div className="p-3 space-y-2">
            {['name: str', 'age: int', 'score: float'].map((attr, i) => (
              <motion.div
                key={attr}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="font-mono text-[10px] text-[#b0b0b0]"
              >
                {attr}
              </motion.div>
            ))}
          </div>
        </div>
        <p className="text-center text-[#888] text-[9px] mt-2 font-mono">DATA (state)</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 max-w-[160px]"
      >
        <div className="border border-[#00FF41]/30 rounded-xl overflow-hidden">
          <div className="bg-[#00FF41]/10 px-3 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF41]" />
            <span className="text-[#00FF41] font-mono text-[10px] uppercase">Methods</span>
          </div>
          <div className="p-3 space-y-2">
            {['greet()', 'update()', 'display()'].map((m, i) => (
              <motion.div
                key={m}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="font-mono text-[10px] text-[#b0b0b0]"
              >
                {m}
              </motion.div>
            ))}
          </div>
        </div>
        <p className="text-center text-[#888] text-[9px] mt-2 font-mono">BEHAVIOUR (actions)</p>
      </motion.div>
    </div>
  );
}

function ConstructorsAnim() {
  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-[#FFB800]/30 bg-[#FFB800]/5 rounded-xl px-4 py-3 w-full max-w-xs"
      >
        <p className="text-[#FFB800] font-mono text-[10px] mb-1">call</p>
        <p className="text-[#E0E0E0] font-mono text-sm">Car("Tesla", 2024)</p>
      </motion.div>

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="w-px h-6 bg-[#555] origin-top"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[#888] font-mono text-[9px]"
      >__init__ runs</motion.div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="w-px h-6 bg-[#555] origin-top"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        className="border-2 border-[#00FF41]/40 bg-[#00FF41]/5 rounded-xl px-4 py-3 w-full max-w-xs"
      >
        <p className="text-[#00FF41] font-mono text-[10px] mb-2">new object created</p>
        <div className="space-y-1">
          {['self.make = "Tesla"', 'self.year = 2024', 'self.speed = 0'].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-[#b0b0b0] font-mono text-[10px]"
            >{line}</motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EncapsulationAnim() {
  return (
    <div className="flex justify-center px-4">
      <div className="relative w-full max-w-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-[#00D4FF]/40 rounded-2xl overflow-hidden"
        >
          <div className="bg-[#00D4FF]/10 px-4 py-2 text-center">
            <span className="text-[#00D4FF] font-mono text-[10px] uppercase tracking-wider">BankAccount</span>
          </div>
          <div className="p-4 space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="text-[#FF4444] font-mono text-xs w-4">🔒</span>
              <span className="text-[#888] font-mono text-[10px] line-through">__balance</span>
              <span className="text-[#777] text-[9px] ml-auto">private</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <span className="text-[#FF4444] font-mono text-xs w-4">🔒</span>
              <span className="text-[#888] font-mono text-[10px] line-through">__pin</span>
              <span className="text-[#777] text-[9px] ml-auto">private</span>
            </motion.div>
            <div className="border-t border-[#1a1a1a] pt-2 mt-2 space-y-2">
              {['deposit(amount)', 'withdraw(amount)', 'get_balance()'].map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[#00FF41] font-mono text-xs w-4">✓</span>
                  <span className="text-[#00FF41]/80 font-mono text-[10px]">{m}</span>
                  <span className="text-[#777] text-[9px] ml-auto">public</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-2 text-center"
        >
          <span className="text-[#888] font-mono text-[9px]">data hidden · controlled access</span>
        </motion.div>
      </div>
    </div>
  );
}

function InheritanceAnim() {
  return (
    <div className="flex flex-col items-center gap-2 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-2 border-[#FFB800]/50 bg-[#FFB800]/5 rounded-xl px-6 py-3 text-center"
      >
        <p className="text-[#FFB800] font-mono text-[10px] uppercase mb-0.5">Parent</p>
        <p className="text-[#E0E0E0] font-display font-bold">Animal</p>
        <p className="text-[#888] font-mono text-[9px] mt-1">name, sound, eat()</p>
      </motion.div>

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="w-px h-4 bg-[#333] origin-top"
      />

      <div className="flex gap-6">
        {[
          { name: 'Dog', extra: 'breed, fetch()', color: '#00FF41' },
          { name: 'Cat', extra: 'indoor, purr()', color: '#00D4FF' },
          { name: 'Bird', extra: 'wingspan, fly()', color: '#FF4444' },
        ].map((child, i) => (
          <motion.div
            key={child.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 200 }}
            className="border rounded-xl px-3 py-2 text-center"
            style={{ borderColor: child.color + '40', backgroundColor: child.color + '08' }}
          >
            <p className="font-mono text-[9px] uppercase mb-0.5" style={{ color: child.color }}>Child</p>
            <p className="text-[#E0E0E0] font-semibold text-xs">{child.name}</p>
            <p className="font-mono text-[9px] mt-1" style={{ color: child.color + 'aa' }}>{child.extra}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-[#888] font-mono text-[9px] mt-1"
      >inherits + extends</motion.p>
    </div>
  );
}

function AbstractionAnim() {
  return (
    <div className="flex flex-col items-center gap-0 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-[#00FF41]/40 bg-[#00FF41]/5 rounded-t-xl px-6 py-3 w-full max-w-xs text-center relative overflow-hidden"
      >
        <p className="text-[#00FF41] font-mono text-[10px] uppercase mb-1">Simple Interface</p>
        <p className="text-[#E0E0E0] font-mono text-xs">car.start()</p>
        <motion.div
          className="absolute inset-x-0 bottom-0 h-0.5 bg-[#00FF41]/40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-xs border-x border-[#1a1a1a] bg-[#111] px-4 py-2"
      >
        <p className="text-[#777] font-mono text-[9px] text-center">— complexity hidden below —</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="border border-[#555]/30 bg-[#111] rounded-b-xl px-4 py-3 w-full max-w-xs space-y-1"
      >
        {['check_fuel()', 'ignition_sequence()', 'calibrate_sensors()', 'start_engine()'].map((step, i) => (
          <motion.p
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="text-[#666] font-mono text-[9px]"
          >
            {i + 1}. {step}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}

function PolymorphismAnim() {
  const animals = [
    { name: 'Dog', method: 'Woof!', color: '#00FF41' },
    { name: 'Cat', method: 'Meow!', color: '#00D4FF' },
    { name: 'Bird', method: 'Tweet!', color: '#FFB800' },
  ];

  return (
    <div className="px-4 space-y-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-[#555]/30 rounded-lg px-4 py-2 text-center bg-[#111]"
      >
        <span className="text-[#b0b0b0] font-mono text-xs">for animal in animals: </span>
        <span className="text-[#00FF41] font-mono text-xs">animal.speak()</span>
      </motion.div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3 }}
        className="w-px h-3 bg-[#333] mx-auto origin-top"
      />
      <div className="flex gap-3 justify-center">
        {animals.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.2, type: 'spring', stiffness: 300 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="rounded-xl px-3 py-2 text-center border"
              style={{ borderColor: a.color + '40', backgroundColor: a.color + '08' }}
            >
              <p className="font-mono text-[9px] uppercase mb-0.5" style={{ color: a.color + '80' }}>same call</p>
              <p className="text-[#E0E0E0] font-semibold text-xs">{a.name}</p>
              <p className="font-mono text-[9px]" style={{ color: a.color }}>.speak()</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="font-mono text-xs font-bold"
              style={{ color: a.color }}
            >
              "{a.method}"
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="text-center text-[#888] font-mono text-[9px]"
      >same interface · different behaviour</motion.p>
    </div>
  );
}

function UmlAnim() {
  return (
    <div className="flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="border-2 border-[#00D4FF]/40 rounded-xl overflow-hidden w-full max-w-[280px]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#00D4FF]/10 px-4 py-3 text-center border-b-2 border-[#00D4FF]/40"
        >
          <p className="text-[#00D4FF] font-display font-bold text-sm">Student</p>
        </motion.div>

        <div className="border-b-2 border-[#00D4FF]/40 p-3 space-y-1">
          {[
            '- name: str',
            '- student_id: int',
            '- subjects: list',
          ].map((attr, i) => (
            <motion.p
              key={attr}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-[#b0b0b0] font-mono text-[10px]"
            >{attr}</motion.p>
          ))}
        </div>

        <div className="p-3 space-y-1">
          {[
            '+ __init__(name, id)',
            '+ enrol(subject)',
            '+ get_details()',
          ].map((method, i) => (
            <motion.p
              key={method}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="text-[#00FF41]/70 font-mono text-[10px]"
            >{method}</motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const ANIMATIONS: Record<string, React.FC> = {
  'classes-objects': ClassesObjectsAnim,
  'attributes-methods': AttributesMethodsAnim,
  'constructors': ConstructorsAnim,
  'encapsulation': EncapsulationAnim,
  'inheritance': InheritanceAnim,
  'abstraction': AbstractionAnim,
  'polymorphism': PolymorphismAnim,
  'object-descriptions-uml': UmlAnim,
};

interface ModuleAnimationProps {
  moduleId: string;
}

export default function ModuleAnimation({ moduleId }: ModuleAnimationProps) {
  const Anim = ANIMATIONS[moduleId];
  if (!Anim) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-6 mb-6 overflow-hidden"
    >
      <p className="text-[#666] font-mono text-[9px] uppercase tracking-widest text-center mb-5">
        Visual Overview
      </p>
      <Anim />
    </motion.div>
  );
}
