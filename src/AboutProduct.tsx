import { AT, CH, DE, FR, GB, IT, JP, NL, RU, US } from 'country-flag-icons/react/3x2';
import './styles/App.css'

function AboutProduct() {
  return (
    <article>
      <header>
        <h1>作曲家PDチェッカーについて</h1>
        <address><a href="https://github.com/y-fukihara/">Yōji Fukihara</a></address>
        <p>更新日: <time dateTime="2026-03-29">2026/03/29</time></p>
      </header>
      <section id="disclaimer">
        <h2>免責事項</h2>
        <ol>
          <li>本ツールは法的なアドバイスを提供するものではありません。あくまで参考情報としてご利用ください。</li>
          <li>本ツールでは著作権法・ベルヌ条約および関連する法律類のみに基づいて計算を行っています。著作物が他の権利によって保護されていたる、あるいは他の法律によって保護されなくなることがあるため、個別の作品および事例については個別に判断してください。</li>
          <li>本ツールの情報は正確であることを保証するものではありません。最新の法律や判例を確認し、必要に応じて専門家に相談してください。</li>
        </ol>
      </section>
      <section>
        <h2>概要</h2>
        <p>作曲家の生没年月日およびその母国あるいは居住地から、作品がパブリックドメインになっているかどうかを推定します。</p>
        <p>日付は (16世紀以前の人物も含め) 全てグレゴリオ暦で換算された表示になっています。</p>
        <h2>入力フォームの説明</h2>
        <h3>適用ルール</h3>
        <p>保護期間の計算ルールを選択します。現在、以下のモードが利用可能です。</p>
        <dl>
          <dt>日本<JP className="flag" /></dt>
          <dd>日本の著作権法 (令和8年4月1日施行) に基づいて計算します。詳細な情報は後述します。</dd>
          <dt>50年</dt>
          <dd>その他の事項を考慮せずに、死亡日から50年後の年末を保護期間の終了日とします。</dd>
          <dt>70年</dt>
          <dd>その他の事項を考慮せずに、死亡日から70年後の年末を保護期間の終了日とします。</dd>
        </dl>
        <h2>結果表示の説明</h2>
        結果表示はそれぞれ以下の情報が記載されています。
        <div className="result-demo">
          <div className="result-demo-list">
            <div className="result-item">
              <div className="result-heading">
                <span className="familyname">姓,</span> 名
              </div>
              <div className="result-details">
                <div className="summary">
                  <span className="result-summary-placeholder">（結果欄）</span>
                </div>
                <div className="expiration">
                  <span className="label">保護期間終了日:</span>
                  <span className="date">YYYY-MM-DD</span>
                </div>
                <div className="lifetime">
                  <div className="birth">
                    <span className="label">出生日:</span>
                    <span className="date">YYYY-MM-DD</span>
                  </div>
                  <div className="death">
                    <span className="label">死亡日:</span>
                    <span className="date">YYYY-MM-DD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p><span className="result-summary-placeholder">(結果欄)</span>には、以下の結果が表示されます。</p>
        <hr />
        <dl>
          <dt style={{ margin: ".2em 0" }}><span className="result-summary-pd">PD</span></dt>
          <dd>設定したルールが適用される国において、全作品がパブリックドメインだと考えられます。</dd>
          <dt style={{ margin: ".2em 0" }}><span className="result-summary-non-pd">non-PD</span></dt>
          <dd>設定したルールが適用される国において、作品は原則的にパブリックドメインではないと考えられます。</dd>
          <dt style={{ margin: ".2em 0" }}><span className="result-summary-partial-pd">partial-PD</span></dt>
          <dd>設定したルールが適用される国において、パブリックドメインのものもありますが、一部の作品は依然として保護されていると考えられます。</dd>
        </dl>
      </section>
      <section>
        <h2>計算ルールについて (日本)</h2>
        <h3>原則的な期間</h3>
        <p>
          著作権の保護期間は2018年に延長されているため、原則的な保護期間は以下の通りになります。
          ただし、後述する戦時加算のために、1957年以前に死亡した人物であっても保護期間が70年になっている可能性があります。
        </p>
        <dl>
          <dt>1967年以前に死去している場合</dt>
          <dd>死亡日から50年</dd>
          <dt>1968年以降に死去している場合</dt>
          <dd>死亡日から70年</dd>
        </dl>
        <h3>戦時加算</h3>
        <p>
          主にサンフランシスコ平和条約に基づき、一部の国家については著作権の保護期間が約10年ほど延長されています。
          この保護期間の延長は、通常の保護期間 (50年または70年が経過した年の年末) に加える形で計算されます。
        </p>
        <p>
          前述の保護期間延長は、この戦時加算も含めて計算されるため、その結果保護期間が2018年12月30日以降であった場合は保護期間が20年延長されることになります。
        </p>
        <p>
          以下では、プログラム上実装済みであるルールのみを記載しています。
          オーストリアは当時ドイツ占領下であったため、スイスは中立国であったため、ドイツとロシアはサンフランシスコ平和条約の批准国ではないため、戦時加算はありません。
        </p>
        <dl>
          <dt>アメリカ<US className="flag" />・イギリス<GB className="flag" /></dt>
          <dd>3794日（およそ10年5か月）</dd>
          <dt>オランダ<NL className="flag" /></dt>
          <dd>3844日（およそ10年6か月）</dd>
          <dt>フランス<FR className="flag" /></dt>
          <dd>8年120日もしくは14年272日（後述）</dd>
          <dt>イタリア<IT className="flag" /></dt>
          <dd>6年（後述）</dd>
          <dt>オーストリア<AT className="flag" />・スイス<CH className="flag" />・ドイツ<DE className="flag" />・ロシア<RU className="flag" /></dt>
          <dd>なし</dd>
        </dl>
        <h3>著作された本国における著作権のルールの影響</h3>
        <p>
          各国の著作権に関連する法律それぞれのために、個別の作品に対する著作権保護期間の判定を機械的に判定することは簡単ではありません。
          特に本ツールで考慮したものと、特に考慮しなかったものを抜粋して記載します。
        </p>
        <h4>フランスの戦時加算</h4>
        <p>
          フランスは第2次世界大戦当時ドイツの占領下にあり、またサンフランシスコ平和条約の批准国ではありません。
          ですが同国は著作権法において第1次・第2次世界大戦それぞれに対応する戦時加算を実施しているため、フランス国内の著作物はこの影響で保護期間が延長されている可能性があります。
        </p>
        <p>対象となる条件と延長期間は以下の通りです。</p>
        <dl>
          <dt>1914年8月2日前に発行され、かつ、1919年2月3日現在公有に帰していない作品</dt>
          <dd>6年152日（1914年8月2日から平和条約の署名の日に続く年の終わりまでの間に経過した期間）</dd>
          <dt>1939年9月3日前に発行され、かつ、1941年8月13日現在公有に帰していない作品</dt>
          <dd>8年120日（1939年9月3日から1948年1月1日までの間に経過した期間）</dd>
        </dl>
        <h4>イタリアの戦時加算</h4>
        <p>
          イタリアはサンフランシスコ平和条約の批准国ではありませんが、イタリアとの平和条約において双務的に6年間の戦時加算が取決められています。
          ベルヌ条約に加盟している外国の著作物については内国民待遇が与えられるため、これにより日本においても該当作品の保護期間は6年延長されると考えられます。
        </p>
        <h4>アメリカの著作権法</h4>
        <p>
          アメリカは1989年まで方式主義を採用していたため、著作権局に作品を登録するなどの手続きが為されなければ著作権（アメリカの法律に基づく権利）が認められませんでした。
          また反対に、1978年1月1日以前に著作権が発行されており、保護されている著作物については、発行後95年という長期間の保護がなされています。
          このように、アメリカにおいては作品の発行年およびその状況ごとに異なる年限の保護期間が設定されることになります。
        </p>
        <p>
          本ツールでは、原則的にこれらを<strong>考慮せず</strong>、死亡年月日と戦時加算のみを考慮しています。
          作品ごとの状況は各自で個別に判断してください。
        </p>
      </section>
      <section>
        <h2>参考文献</h2>
        <ul>
          <li><a href="https://laws.e-gov.go.jp/law/345AC0000000048/20260401_505AC0000000033?occasion_date=20260401">著作権法 | e-Gov 法令検索</a></li>
          <li><a href="https://www.bunka.go.jp/seisaku/chosakuken/hokaisei/kantaiheiyo_chosakuken/1411890.html">著作物等の保護期間の延長に関するQ&A</a>（文化庁）</li>
          <li><a href="https://www.cric.or.jp/db/world/index.html">外国著作権法一覧</a>（公益社団法人著作権情報センター）</li>
          <li>一九四八年にブラッセルで改正された著作権に関するベルヌ条約（外務省、日本語、pdf）</li>
          <ul>
            <li><a href="https://www.mofa.go.jp/mofaj/gaiko/treaty/pdfs/B-S49-0111_1.pdf">pp. 111&ndash;123</a></li>
            <li><a href="https://www.mofa.go.jp/mofaj/gaiko/treaty/pdfs/B-S49-0111_2.pdf">pp. 124&ndash;138</a></li>
          </ul>
          <li><a href="https://www.mofa.go.jp/mofaj/gaiko/treaty/htmls/B-S38-P2-795.html">日本国との平和条約（サンフランシスコ平和条約）</a>（外務省）</li>
          <li><a href="https://www.loc.gov/collections/united-states-treaties-and-other-international-agreements/about-this-collection/">United States Treaties and Other International Agreements</a>（アメリカ議会図書館）</li>
        </ul>
      </section>
    </article>
  )
}

export default AboutProduct;