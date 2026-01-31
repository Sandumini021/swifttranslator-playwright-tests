const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
    url: 'https://www.swifttranslator.com/',
    timeouts: {
      pageLoad: 2000,
      afterClear: 1000,
      translation: 3000,
      betweenTests: 2000
    },
    selectors: {
      inputField: 'Input Your Singlish Text Here.',
      outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
    }
  };
  
  // Test Data - Completely New Test Cases
  const TEST_DATA = {
    positive: [
      // Simple Sentences
      {
        tcId: 'Pos_Fun_0001',
        name: 'Basic daily greeting',
        input: 'Oyaata kohomadha dhaen ?',
        expected: 'ඔයාට කොහොමද දැන් ?',
        category: ' Greeting / request / response',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0002',
        name: 'Simple daily usage sentence',
        input: 'Mama dhaen inne gedhara .',
        expected: 'මම දැන් ඉන්නේ ගෙදර .',
        category: 'Daily language usage',
        grammar: 'Simple sentence',
        length: 'S'
      },
      
      // Compound Sentences
      {
        tcId: 'Pos_Fun_0003',
        name: 'Two activities connected with typos',
        input: 'Mama gedhara yanvaa dhaen moko mata podi prshnayak thiyenvaa !',
        expected: 'මම ගෙදර යන්වා දැන් මොකො මට පොඩි ප්‍රශ්නයක් තියෙන්වා !',
        category: 'Typographical error handling',
        grammar: 'Compound sentence',
        length: 'M'
      },
      {
        tcId: 'Pos_Fun_0004',
        name: 'Compound sentence with technical English terms and punctuation',
        input: 'Mama laptop eka open   kalaa, report eka upload karannam.',
        expected: 'මම laptop එක open   කලා, report එක upload කරන්නම්.',
        category: 'Formatting (spaces / line breaks / paragraph)',
        grammar: 'Compound sentence',
        length: 'M'
      },
      
      // Complex Sentences
      {
        tcId: 'Pos_Fun_0005',
        name: 'Simple daily usage sentence',
        input: 'mama enakota raee vevi godak',
        expected: 'මම එනකොට රෑ වෙවි ගොඩක්',
        category: 'Daily language usage',
        grammar: 'Complex sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0006',
        name: 'Short cause effect phrase pattern sentence',
        input: 'vaessa nisaa mama innee gedhara',
        expected: 'වැස්ස නිසා මම ඉන්නේ ගෙදර',
        category: 'Word combination / phrase pattern',
        grammar: 'Complex sentence',
        length: 'S'
      },

      // Questions
      {
        tcId: 'Pos_Fun_0007',
        name: 'Polite question format',
        input: 'mama adha udhee ofis ekata aevillaa iimeel tika balalaa riplayi kaLaa, sistam eka apdeet kaLaa, deetaabees ekee rekoods tika chek kaLaa, tiim ekka diskaShan ekak thiyalaa iShuu tika soolv kaLaa, ripoorts hadhalaa maeneejarta yaevvaa, ekayi mata udheekaeema araganna amathaka unee dhaen kaeevata kamak naedhdha?',
        expected: 'මම අද උදේ ඔෆිස් එකට ඇවිල්ලා ඊමේල් ටික බලලා රිප්ලයි කළා, සිස්ටම් එක අප්ඩේට් කළා, ඩේටාබේස් එකේ රෙකෝඩ්ස් ටික චෙක් කළා, ටීම් එක්ක ඩිස්කෂන් එකක් තියලා ඉෂූ ටික සෝල්ව් කළා, රිපෝර්ට්ස් හදලා මැනේජර්ට යැව්වා, එකයි මට උදේකෑම අරගන්න අමතක උනේ දැන් කෑවට කමක් නැද්ද?',
        category: 'Empty/cleared input handling',
        grammar: 'Interrogative (question)',
        length: 'L'
      },
      
      // Commands
      {
        tcId: 'Pos_Fun_0010',
        name: 'Present + Command style',
        input: 'vaeda ikmanata karanna !',
        expected: 'වැඩ ඉක්මනට කරන්න !',
        category: 'Daily language usage',
        grammar: 'Imperative (command)',
        length: 'S'
      },
      {
        tcId: 'Neg_Fun_0003',
        name: 'Casual imperative check request',
        input: 'ow oyaa haridha balannako ikmanata',
        expected: 'ඔව් ඔයා හරිද බලන්නකො ඉක්මනට',
        category: 'Daily language usage',
        grammar: 'Imperative (command)',
        length: 'M'
      },
      
      // Greetings and Responses
      {
        tcId: 'Neg_Fun_0004',
        name: 'Simple thank you response',
        input: 'Bohoma istuti oyage help ekata',
        expected: 'බොහෝම ඉස්තුති ඔයාගේ හෙල්ප් එකට',
        category: 'Greeting / request / response',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Neg_Fun_0005',
        name: 'Real time output update while typing',
        input: 'Mama gedara enawDa Oyaa enawada eNawda. ',
        expected: 'මම ගෙදර යනවා ඔයා\n එනවාද',
        category: 'Greeting / request / response',
        grammar: 'Simple sentence',
        length: 'S'
      },
      
      // Tense Variations
      {
        tcId: 'Pos_Fun_0014',
        name: 'Future tense action',
        input: 'heta assignment eka email eken sabmit karanna yannee.',
        expected: 'හෙට assignment එක email එකෙන් සබ්මිට් කරන්න යන්නේ.',
        category: 'Mixed Singlish + English',
        grammar: 'Future tense',
        length: 'M'
      },
      {
        tcId: 'Neg_Fun_0006',
        name: 'Past tense action',
        input: 'mama iiyee ofis ekata yadhdhi wetunaa !!!!',
        expected: 'මම ඊයේ ඔෆිස් එකට යද්දි වැටුනා !!!!',
        category: 'Daily language usage',
        grammar: 'Past tense',
        length: 'M'
      },
      
      // Plural and Pronouns
      {
        tcId: 'Neg_Fun_0009',
        name: 'Plural pronoun usage',
        input: 'mama poth tika aran eddi oyala iwara karala thiyenna onii',
        expected: 'මම පොත් ටික අරන් එද්දි ඔයාලා ඉවර කරලා තියෙන්න ඕනි',
        category: 'Daily language usage',
        grammar: 'Plural form',
        length: 'M'
      },
      {
        tcId: 'Pos_Fun_0019',
        name: 'Plural pronoun usage',
        input: 'saththu tika balan aethi gedhara yanna',
        expected: 'සත්තු ටික බලන් ඇති ගෙදර යන්න',
        category: 'Daily language usage',
        grammar: 'Plural form',
        length: 'M'
      },
      
      // Word Combinations
      {
        tcId: 'Pos_Fun_0020',
        name: 'Short phrase pattern sentence',
        input: 'Eka hariyata balalaa kiyanna',
        expected: 'එක හරියට බලලා කියන්න',
        category: 'Word combination / phrase pattern',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0021',
        name: 'Short phrase pattern sentence',
        input: 'Api tika tika igena gannawa ee hindha thama hariyata dhanne nae',
        expected: 'අපි ටික ටික ඉගෙන ගන්නව ඒ හින්ද තම හරියට දන්නෙ නැ',
        category: 'Word combination / phrase pattern',
        grammar: 'Combine sentence',
        length: 'M'
      },
      // Mixed Language
      {
        tcId: 'Neg_Fun_0010',
        name: 'Mixed language with line break formatting preservation',
        input: `Mama report eka hadala
      
      email eken yawwa`,
        expected: `මම report එක හදලා
      
      email එකෙන් යැව්වා`,
        category: 'Formatting (spaces / line breaks / paragraph)',
        grammar: 'Simple sentence',
        length: 'M',
      },
      
      {
        tcId: 'Neg_Fun_0011',
        name: 'Mixed language negative past sentence',
        input: 'Mama phone eka aran awe nae',
        expected: 'මම phone එක අරන් ආවේ නැ',
        category: 'Mixed Singlish + English',
        grammar: 'Negation (negative form)',
        length: 'S'
      },
         
      // Numbers , dates and Formats
      {
        tcId: 'Pos_Fun_0024',
        name: 'Polite request with date format',
        input: 'Report eka 12/07/2026 ta kalin submit karanna puluvandha ?',
        expected: 'Report එක 12/07/2026 ට කලින් submit කරන්න පුලුවන්ද ?',
        category: 'Punctuation / numbers',
        grammar: 'Interrogative (question)',
        length: 'M'
      },

      {
        tcId: 'Neg_Fun_0013',
        name: 'Polite request with distance unit',
        input: 'Api 15km vage yanna oni, bus ekak arrange karanna puluwanda',
        expected: 'අපි 15km වගෙ යන්න ඔනි, bus එකක් arrange කරන්න පුලුවන්ද',
        category: 'Punctuation / numbers',
        grammar: 'Interrogative (question)',
        length: 'M'
      },
    
      {
        tcId: 'Neg_Fun_0014',
        name: 'Robustness validation',
        input: 'adha raeeta kaalaa yanna inna, bath uyaNNam',
        expected: 'අද රෑට කාලා යන්න ඉන්න, බත් උයන්නම්',
        category: 'wrong segmentation',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Neg_Fun_0015',
        name: 'Joined compound words',
        input: 'mata yanna bahe dhaen',
        expected: 'මට යන්න බැහැ දැන්',
        category: 'Typographical error handling',
        grammar: 'Present tense',
        length: 'S'
      },
      {
        tcId: 'Neg_Fun_0016',
        name: 'Mixed spacing issues',
        input: 'apimixkaralagamuda',
        expected: 'අපි mix කරලගමුද',
        category: 'Typographical error handling',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Neg_Fun_0017',
        name: 'Robustness validation',
        input: 'KAKATHAKARANNA EPAA',
        expected: 'කතාකරන්නා එපා',
        category: 'Typographical error handling',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0030',
        name: 'Informal slang phrase',
        input: 'hari ban, ennam',
        expected: 'හරි බන්, එන්නම්',
        category: 'Slang / informal language',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0031',
        name: 'Informal slang phrase',
        input: 'mata salli naee ban passee dhennam',
        expected: 'මට සල්ලි නෑ බන් පස්සේ දෙන්නම්',
        category: 'Slang / informal language',
        grammar: 'Simple sentence',
        length: 'M'
      },
      {
        tcId: 'Pos_Fun_0032',
        name: 'Colloquial expression',
        input: 'ehema karanna epaa harita balalaa karanna',
        expected: 'එහෙම කරන්න එපා හරිට බලලා කරන්න',
        category: 'Slang / informal language',
        grammar: 'Interrogative (question)',
        length: 'M'
      },
      {
        tcId: 'Pos_Fun_0033',
        name: 'Colloquial expression',
        input: 'api tikak kalpanaa karalaa passee thiiraNayak gannamu',
        expected: 'අපි ටිකක් කල්පනා කරලා පස්සේ තීරණයක් ගන්නමු',
        category: 'Slang / informal language',
        grammar: 'Interrogative (question)',
        length: 'M'
      },
      {
        tcId: 'Pos_Fun_0034',
        name: 'Colloquial expression',
        input: 'tikak innakoo',
        expected: 'ටිකක් ඉන්නකෝ',
        category: 'Slang / informal language',
        grammar: 'Interrogative (question)',
        length: 'M'
      },
      {
        tcId: 'Pos_Fun_0035',
        name: 'Colloquial past tense expression',
        input: 'api tikak kalpanaa karaa',
        expected: 'අපි ටිකක් කල්පනා කරා',
        category: 'Mixed Singlish + English',
        grammar: 'Past tense',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0036',
        name: 'Abbreviation in sentence',
        input: 'Info ekak evanna',
        expected: 'Info එකක් එවන්න',
        category: 'Names / places / common English words',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0037',
        name: 'Abbreviation in sentence with time',
        input: '2 hrs idhalaa enna',
        expected: '2 hrs ඉදලා එන්න',
        category: 'Names / places / common English words',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0038',
        name: 'Complex slang statement',
        input: 'machQQ mama leet unaa ban traefik ekak thibba nisaa',
        expected: 'මචං මම ලේට් උනා බන් ට්‍රැෆික් එකක් තිබ්බ නිසා',
        category: 'Slang / informal language',
        grammar: 'Complex sentence',
        length: 'M'
      },
      {
        tcId: 'Pos_Fun_0039',
        name: 'Complex slang statement',
        input: '1 msg ekak dhenna',
        expected: '1 msg එකක් දෙන්න',
        category: 'Slang / informal language',
        grammar: 'Complex sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0040',
        name: 'Complex slang statement',
        input: 'kamak naee ithin',
        expected: 'කමක් නෑ ඉතින්',
        category: 'Slang / informal language',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0041',
        name: 'Complex slang statement',
        input: 'anee mandhaa ban meeka karanna baee',
        expected: 'අනේ මන්දා බන් මේක කරන්න බෑ',
        category: 'Slang / informal language',
        grammar: 'Complex sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0042',
        name: 'Simple slang statement',
        input: 'adoo ban !!!!!!',
        expected: 'අඩෝ බන් !!!!!!',
        category: 'Slang / informal language',
        grammar: 'Simple sentence',
        length: 'S'
      },
      {
        tcId: 'Pos_Fun_0043',
        name: 'Compound informal slang statement',
        input: 'hari ban poddak idapan, mama dhavasama bisi unaa',
        expected: 'හරි බන් පොඩ්ඩක් ඉඩපන්, මම දවසම බිසි උනා',
        category: 'Slang / informal language',
        grammar: 'Complex sentence',
        length: 'M'
      },
      {
        tcId: 'Pos_Fun_0044',
        name: 'Short phrase pattern sentence',
        input: 'api yamu ban passee balamu mokadha vennee kiyalaa',
        expected: 'අපි යමු බන් පස්සේ බලමු මොකද වෙන්නේ කියලා',
        category: 'Slang / informal language',
        grammar: 'Complex sentence',
        length: 'M'
      },
      {
        tcId: 'Pos_Fun_0045',
        name: 'Short phrase pattern sentence',
        input: 'machn mama leet unaa ban traefik ekak thibba nisaa',
        expected: 'මච්න් මම ලේට් උනා බන් ට්‍රැෆික් එකක් තිබ්බ නිසා',
        category: 'Slang / informal language',
        grammar: 'Complex sentence',
        length: 'S'
      }
    ],

      // UI
      ui: [
        {
          tcId: 'Pos_UI_0001',
          name: 'Real-time negation typing update',
          input: `M
    Ma
    Mama
    Mama enna
    Mama enna ne`,
          expected: `ම
    ම
    මම
    මම එන්න
    මම එන්න නෑ`,
          category: 'Daily language usage',
          grammar: 'Negation (negative form)',
          length: 'S',
        },
        {
          tcId: 'Neg_UI_0001',
          name: 'Special characters with letters input',
          input: '@m@mmm@ ### !!!',
          expected: '@m@mmm@ ### !!!',
        },
        {
          tcId: 'Pos_UI_0002',
          name: 'Real-time update with mixed punctuation',
          input: `E
    E
    Ena
    Enna
    Enna ikmanata!`,
          expected: `එ
    එ
    එන්
    එන්න
    එන්න ඉක්මනට!`,
        }
      ]
    };
  
  // Helper Functions
  class TranslatorPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigateToSite() {
      await this.page.goto(CONFIG.url);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
    }
  
    async getInputField() {
      return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
    }
  
    async getOutputField() {
      return this.page
        .locator(CONFIG.selectors.outputContainer)
        .filter({ hasNot: this.page.locator('textarea') })
        .first();
    }
  
    async clearAndWait() {
      const input = await this.getInputField();
      await input.clear();
      await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
    }
  
    async typeInput(text) {
      const input = await this.getInputField();
      await input.fill(text);
    }
  
    async waitForOutput() {
      await this.page.waitForFunction(
        () => {
          const elements = Array.from(
            document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
          );
          const output = elements.find(el => {
            const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
            return !isInputField && el.textContent && el.textContent.trim().length > 0;
          });
          return output !== undefined;
        },
        { timeout: 10000 }
      );
      await this.page.waitForTimeout(CONFIG.timeouts.translation);
    }
  
    async getOutputText() {
      const output = await this.getOutputField();
      const text = await output.textContent();
      return text.trim();
    }
  
    async performTranslation(inputText) {
      await this.clearAndWait();
      await this.typeInput(inputText);
      await this.waitForOutput();
      return await this.getOutputText();
    }
  }
  
  // Test Suite
  test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
    let translator;
  
    test.beforeEach(async ({ page }) => {
      translator = new TranslatorPage(page);
      await translator.navigateToSite();
    });
  
    // Positive Functional Tests
    test.describe('Positive Functional Tests', () => {
      for (const testCase of TEST_DATA.positive) {
        test(`${testCase.tcId} - ${testCase.name}`, async () => {
          const actualOutput = await translator.performTranslation(testCase.input);
          expect(actualOutput).toBe(testCase.expected);
          await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
        });
      }
    });
  
    // UI Test
    test.describe('UI Functionality Tests', () => {
      test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
        const translator = new TranslatorPage(page);
        const input = await translator.getInputField();
        const output = await translator.getOutputField();
  
        await translator.clearAndWait();
        
        // Type partial input
        await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
        
        // Wait for partial output
        await page.waitForTimeout(1500);
        
        // Verify partial translation appears
        let outputText = await output.textContent();
        expect(outputText.trim().length).toBeGreaterThan(0);
        
        // Complete typing
        await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
        
        // Wait for full translation
        await translator.waitForOutput();
        
        // Verify full translation
        outputText = await translator.getOutputText();
        expect(outputText).toBe(TEST_DATA.ui.expectedFull);
        
        await page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    });
  });