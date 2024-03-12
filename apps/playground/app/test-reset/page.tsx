import * as React from 'react';
import { Theme, Container, Section, Reset } from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Container size="1" px="8">
                <Section size="3">
                  <ResetChildren>
                    <RadixLogo />
                    <a href="https://example.com">Anchor</a>
                    <abbr>Abbreviation</abbr>
                    <address>Contact information</address>
                    <article>Article</article>
                    <aside>Aside content</aside>
                    <audio>Audio content</audio>
                    <b>Bold text</b>
                    <bdi>Bi-directional Isolation</bdi>
                    <bdo>Bi-directional Override</bdo>
                    <blockquote>Block quote</blockquote>
                    <button>Button</button>
                    <cite>Cited text</cite>
                    <code>Computer code</code>
                    <data>Machine-readable equivalent</data>
                    <dd>Description in a description list</dd>
                    <del>Deleted text</del>
                    <details>
                      Additional details
                      <summary>Summary for a details element</summary>
                    </details>
                    <dfn>Defining term</dfn>
                    <div>Div</div>
                    <dl>Description list</dl>
                    <dt>Term in a description list</dt>
                    <em>Emphasized text</em>
                    <fieldset>Group of form-related elements</fieldset>
                    <figcaption>Caption for a figure element</figcaption>
                    <figure>Self-contained content</figure>
                    <footer>Document or section footer</footer>
                    <form>HTML form</form>
                    <h1>HTML heading 1</h1>
                    <h2>HTML heading 2</h2>
                    <h3>HTML heading 3</h3>
                    <h4>HTML heading 4</h4>
                    <h5>HTML heading 5</h5>
                    <h6>HTML heading 6</h6>
                    <header>Document or section header</header>
                    <hr />
                    <i>Italic text</i>
                    <iframe src="https://example.com" />
                    <img src="https://source.unsplash.com/random" />

                    {/* All input types: */}
                    <input placeholder="Input control" />
                    {/* <input placeholder="Input control" type="button" /> */}
                    {/* <input placeholder="Input control" type="image" /> */}
                    {/* <input placeholder="Input control" type="text" /> */}
                    {/* <input placeholder="Input control" type="checkbox" /> */}
                    {/* <input placeholder="Input control" type="color" /> */}
                    {/* <input placeholder="Input control" type="date" /> */}
                    {/* <input placeholder="Input control" type="datetime-local" /> */}
                    {/* <input placeholder="Input control" type="email" /> */}
                    {/* <input placeholder="Input control" type="file" /> */}
                    {/* <input placeholder="Input control" type="hidden" /> */}
                    {/* <input placeholder="Input control" type="month" /> */}
                    {/* <input placeholder="Input control" type="number" /> */}
                    {/* <input placeholder="Input control" type="password" /> */}
                    {/* <input placeholder="Input control" type="radio" /> */}
                    {/* <input placeholder="Input control" type="range" /> */}
                    {/* <input placeholder="Input control" type="reset" /> */}
                    {/* <input placeholder="Input control" type="search" /> */}
                    {/* <input placeholder="Input control" type="submit" /> */}
                    {/* <input placeholder="Input control" type="tel" /> */}
                    {/* <input placeholder="Input control" type="time" /> */}
                    {/* <input placeholder="Input control" type="url" /> */}
                    {/* <input placeholder="Input control" type="week" /> */}

                    <ins>Inserted text</ins>
                    <kbd>Keyboard input</kbd>
                    <label>Form field label text</label>
                    <legend>Caption for a fieldset element</legend>
                    <li>List item</li>
                    <main>Main content</main>
                    <mark>Marked or highlighted text</mark>
                    <nav>Navigation links</nav>
                    <ol>
                      <li>Coffee</li>
                      <li>Tea</li>
                      <li>Milk</li>
                    </ol>
                    <output>Result of a calculation</output>
                    <p>Paragraph</p>
                    <picture>Container for multiple image sources</picture>
                    <pre>Preformatted text: {'"    "'}</pre>
                    <q>Short quote</q>
                    <s>Text that is no longer correct</s>
                    <samp>Sample output</samp>
                    <section>Section in a document</section>
                    <select name="select" id="select">
                      <option value="1">Select Option 1</option>
                      <option value="2">Select Option 2</option>
                      <option value="3">Select Option 3</option>
                      <option value="4">Select Option 4</option>
                    </select>
                    <small>Smaller text</small>
                    <span>Inline element</span>
                    <strong>Important text</strong>
                    <sub>Subscripted text</sub>
                    <sup>Superscripted text</sup>
                    <table>
                      <ResetChildren>
                        <caption>Table</caption>
                        <thead>
                          <ResetChildren>
                            <tr>
                              <ResetChildren>
                                <th scope="col">Person</th>
                                <th scope="col">Most interest in</th>
                                <th scope="col">Age</th>
                              </ResetChildren>
                            </tr>
                          </ResetChildren>
                        </thead>
                        <tbody>
                          <ResetChildren>
                            <tr>
                              <ResetChildren>
                                <th scope="row">Chris</th>
                                <td>HTML tables</td>
                                <td>22</td>
                              </ResetChildren>
                            </tr>
                            <tr>
                              <ResetChildren>
                                <th scope="row">Dennis</th>
                                <td>Web accessibility</td>
                                <td>45</td>
                              </ResetChildren>
                            </tr>
                            <tr>
                              <ResetChildren>
                                <th scope="row">Sarah</th>
                                <td>JavaScript frameworks</td>
                                <td>29</td>
                              </ResetChildren>
                            </tr>
                            <tr>
                              <ResetChildren>
                                <th scope="row">Karen</th>
                                <td>Web performance</td>
                                <td>36</td>
                              </ResetChildren>
                            </tr>
                          </ResetChildren>
                        </tbody>
                        <tfoot>
                          <ResetChildren>
                            <tr>
                              <ResetChildren>
                                <th scope="row" colSpan={2}>
                                  Average age
                                </th>
                                <td>33</td>
                              </ResetChildren>
                            </tr>
                          </ResetChildren>
                        </tfoot>
                      </ResetChildren>
                    </table>

                    <textarea placeholder="Multi-line textarea" />
                    <ul>
                      <li>Coffee</li>
                      <li>Tea</li>
                      <li>Milk</li>
                    </ul>
                    <u>Text with unarticulated annotation</u>
                    <var>Variable</var>
                    <video
                      autoPlay
                      loop
                      muted
                      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                    />
                  </ResetChildren>
                </Section>
              </Container>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

const ResetChildren = ({ children }: { children: React.ReactNode }) => {
  return React.Children.map(children, (child) => <Reset>{child}</Reset>);
};

const RadixLogo = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      width="76"
      height="24"
      viewBox="0 0 76 24"
      fill="currentcolor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M43.9022 20.0061H46.4499C46.2647 19.0375 46.17 18.1161 46.17 17.0058V12.3753C46.17 9.25687 44.3893 7.72127 41.1943 7.72127C38.3003 7.72127 36.3324 9.23324 36.0777 11.8083H38.9254C39.0181 10.698 39.8052 9.96561 41.1017 9.96561C42.4446 9.96561 43.3243 10.6743 43.3243 12.1391V12.7061L39.8052 13.1077C37.4206 13.3912 35.5684 14.3834 35.5684 16.7931C35.5684 18.9666 37.2353 20.2659 39.5274 20.2659C41.4027 20.2659 42.9845 19.4863 43.6401 18.1161C43.6689 18.937 43.9022 20.0061 43.9022 20.0061ZM40.3377 18.1634C39.157 18.1634 38.5087 17.5727 38.5087 16.6278C38.5087 15.3757 39.4579 15.0922 40.7082 14.9268L43.3243 14.6197V15.352C43.3243 17.242 41.8658 18.1634 40.3377 18.1634ZM56.2588 20.0061H59.176V3H56.2125V9.96561C55.6569 8.76075 54.3141 7.72127 52.4851 7.72127C49.3058 7.72127 47.099 10.2963 47.099 14.0054C47.099 17.7381 49.3058 20.2896 52.4851 20.2896C54.2678 20.2896 55.68 19.2973 56.2588 18.0925V20.0061ZM56.282 14.218C56.282 16.5569 55.1938 18.0689 53.3185 18.0689C51.3969 18.0689 50.1856 16.486 50.1856 14.0054C50.1856 11.5485 51.3969 9.94198 53.3185 9.94198C55.1938 9.94198 56.282 11.454 56.282 13.7928V14.218ZM60.9066 5.97304H64.0553V3.01996H60.9066V5.97304ZM60.9992 20.0061H63.9627V8.00476H60.9992V20.0061ZM67.6638 20.0061L70.6041 15.8954L73.5212 20.0061H76.9246L72.3636 13.7219L76.5542 8.00476H73.3823L70.7661 11.7138L68.1731 8.00476H64.7697L69.0066 13.8637L64.4919 20.0061H67.6638Z"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.9132 20V14.0168H28.7986L32.4513 20H35.7006L31.6894 13.5686C33.5045 12.986 35.0955 11.507 35.0955 9.01961C35.0955 5.7479 32.7994 4 28.9571 4H22V20H24.9132ZM24.9132 6.35294V11.6863H28.821C31.0395 11.6863 32.1599 10.7675 32.1599 9.01961C32.1599 7.27171 30.9395 6.35294 28.621 6.35294H24.9132Z"
      ></path>
      <path d="M7 23C3.13401 23 0 19.6422 0 15.5C0 11.3578 3.13401 8 7 8V23Z"></path>
      <path d="M7 0H0V7H7V0Z"></path>
      <path d="M11.5 7C13.433 7 15 5.433 15 3.5C15 1.567 13.433 0 11.5 0C9.56704 0 8 1.567 8 3.5C8 5.433 9.56704 7 11.5 7Z"></path>
    </svg>
  );
};
