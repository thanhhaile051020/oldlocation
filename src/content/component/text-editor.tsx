// @ts-ignore
import PropTypes from "prop-types";
import * as React from "react";
import { BaseComponent, HistoryProps } from "react-onex";
import { getLocale, storage } from "uione";
import "../../assets/css/text-editor.scss";
import configEditor from "./config-editor.json";
import "./text-editor.scss";
import applicationContext from "../config/ApplicationContext";
import {DefaultResourceService} from "uione"
interface InternalProp extends HistoryProps {
  editorChange: any;
  html: any;
  disabled: boolean;
}

export class TextEditorComponent extends BaseComponent<InternalProp, any> {
  constructor(props) {
    super(props, storage.resource(),storage.ui(), getLocale);
    this.state = {
      FormatText: "",
      FormatFont: "",
      Format: "",
      FormatSize: "",
      FormatBackgroundColor: "",
      FormatColor: "",
      showToolbar: false,
      selectionCreateRange: false,
      savedSelection: {},
      updateInit: false,
    };
    this.oDoc = React.createRef();
    this.switchMode = React.createRef();
    if (this.state.updateInit) {
      this.oDoc.current.innerHTML = this.props.html;
      this.setState({ updateInit: true });
    }
  }

  protected oDoc: any;
  protected switchMode: any;

  protected parentNodesCurrent: string[];
  protected range: Range;
  protected text = "Lorem ipsum";
  protected sDefTxt: any;
  protected currentNodeHTML: any;
  protected textSelectionChange: string;

  componentDidMount() {
    this.initDoc();
  }

  componentWillMount() {
    console.log("init", this.props.html);
  }

  componentWillUpdateMount() {
    console.log("init", this.props.html);
  }

  initDoc = () => {
    this.sDefTxt = this.oDoc.current.innerHTML;
    if (this.switchMode.current.checked) {
      this.setDocMode();
    }
    document.body.spellcheck = false;
    this.oDoc.current.addEventListener("click", this.idNode);
    this.oDoc.current.addEventListener("click", (e) => {
      this.selectionChange(e);
    });
    // hidden toolbar when init
    const toolBar = document.getElementById("toolBar");
    toolBar.style.display = "none";
  };

  onBlurChange = () => {
    this.props.editorChange(this.oDoc.current.innerHTML);
  };

  getCurrentTagName = () => {
    const tag =
      this.currentNodeHTML.hasOwnProperty("tagName") &&
      this.currentNodeHTML.tagName === "LI"
        ? this.currentNodeHTML.parentNode.tagName
        : this.currentNodeHTML.tagName;
    return tag;
  };

  getStyleValue = (styleName) => {
    if (!this.currentNodeHTML) {
      return "";
    } else {
      return this.bruceforceStyleValue(styleName, this.currentNodeHTML);
    }
  };

  hasStyle = (att, value) => {
    const classes = "active";
    if (!this.currentNodeHTML) {
      return "";
    } else {
      this.getListTagCurrent();
      return (
        this.bruceforceStyleValue(att, this.currentNodeHTML) === value &&
        classes
      );
    }
  };

  hasTagName = (tagName) => {
    if (!tagName) {
      return;
    }
    if (!this.currentNodeHTML) {
      return "";
    } else {
      this.getCurrentTagName();
      return this.bruceforceTagName(tagName, this.currentNodeHTML);
    }
  };

  hasTagNameFormatText = (tagName) => {
    if (!tagName) {
      return;
    }
    const classes = "active";
    if (!this.currentNodeHTML) {
      return "";
    } else {
      return this.bruceforceTagName(tagName, this.currentNodeHTML)
        ? this.currentNodeHTML.firstChild
        : "";
    }
  };

  getAttributeValue = (attName) => {
    if (!this.currentNodeHTML) {
      return "";
    } else {
      return this.bruceforceAttribute(attName, this.currentNodeHTML);
    }
  };
  bruceforceAttribute = (attr, currentNode) => {
    const currentValue = currentNode.getAttribute(attr);
    if (
      (currentNode.tagName && currentNode.tagName === "DIV") ||
      !currentValue
    ) {
      return false;
    } else if (currentValue) {
      return currentValue;
    } else {
      if (!currentNode.parentNode) {
        return false;
      }
      return this.bruceforceAttribute(attr, currentNode.parentNode);
    }
  };

  bruceforceStyleValue = (attr, currentNode) => {
    const currentValue = currentNode.style[attr];
    if (
      (currentNode.tagName && currentNode.tagName === "DIV") ||
      !currentValue
    ) {
      return false;
    } else if (currentValue) {
      return currentValue;
    } else {
      if (!currentNode.parentNode) {
        return false;
      }
      return this.bruceforceStyleValue(attr, currentNode.parentNode);
    }
  };

  bruceforceTagName = (tagName, currentNode) => {
    if (currentNode && currentNode.tagName === "DIV") {
      return false;
    } else if (currentNode && currentNode.tagName === tagName) {
      return true;
    } else {
      if (!currentNode.parentNode) {
        return false;
      }
      return this.bruceforceTagName(tagName, currentNode.parentNode);
    }
  };

  idNode = (e) => {
    e.preventDefault();
    // this.oDoc.current.focus();
    this.currentNodeHTML = e.target;
    this.getListTagCurrent();
    if (this.textSelectionChange) {
      const toolBar = document.getElementById("toolBar");
      if (toolBar && toolBar.style) {
        toolBar.style.left = "0";
        toolBar.style.top = "0";
        toolBar.style.display = "none";
      }
    }
    return e;
  };

  saveSelectionForCreateRanage = (containerEl) => {
    const range = window.getSelection().getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;

    return {
      start,
      end: start + range.toString().length,
    };
  };

  restoreSelectionForCreateRange = (containerEl, savedSel) => {
    let charIndex = 0;
    const range = document.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    const nodeStack = [containerEl];
    let node = null,
      foundStart = false,
      stop = false;
    while (!stop) {
      node = nodeStack.pop();
      if (node === undefined) {
        break;
      }
      if (node.nodeType === 3) {
        const nextCharIndex = charIndex + node.length;
        if (
          !foundStart &&
          savedSel.start >= charIndex &&
          savedSel.start <= nextCharIndex
        ) {
          range.setStart(node, savedSel.start - charIndex);
          foundStart = true;
        }
        if (
          foundStart &&
          savedSel.end >= charIndex &&
          savedSel.end <= nextCharIndex
        ) {
          range.setEnd(node, savedSel.end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  saveSelectionForCreateTextRange = (containerEl) => {
    // @ts-ignore
    const selectedTextRange = document.selection.createRange();
    // @ts-ignore
    const preSelectionTextRange = document.body.createTextRange();
    preSelectionTextRange.moveToElementText(containerEl);
    preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
    const start = preSelectionTextRange.text.length;

    return {
      start,
      end: start + selectedTextRange.text.length,
    };
  };

  restoreSelectionForCreateTextRange = (containerEl, savedSel) => {
    // @ts-ignore
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(containerEl);
    textRange.collapse(true);
    textRange.moveEnd("character", savedSel.end);
    textRange.moveStart("character", savedSel.start);
    textRange.select();
  };

  selectionChange = (e) => {
    if (window.getSelection && document.createRange) {
      const savedSelection = this.saveSelectionForCreateRanage(
        document.getElementById("content-editor")
      );
      this.setState({ selectionCreateRange: true, savedSelection });
    } else {
      // @ts-ignore
      if (document.selection && document.body.createTextRange) {
        const savedSelection = this.saveSelectionForCreateTextRange(
          document.getElementById("content-editor")
        );
        this.setState({ selectionCreateRange: false, savedSelection });
      }
    }
    let textSelection: string = "";
    if (window.getSelection) {
      // @ts-ignore
      textSelection = window.getSelection();
    } else if (document.getSelection) {
      // @ts-ignore
      textSelection = document.getSelection();
    } else {
      // @ts-ignore
      if (document.selection) {
        // @ts-ignore
        textSelection = document.selection.createRange().text;
      }
    }
    this.textSelectionChange = textSelection.toString();
    if (textSelection.toString().length > 0) {
      const toolBar = document.getElementById("toolBar");
      const selection = window.getSelection();
      // If the selection doesn't represent a range, let's ignore it.
      // --
      // NOTE: I'd rather use the "type" property (None, Range, Caret); however, in
      // my testing, this does not appear to be supported in IE. As such, we'll use
      // the rangeCount and test the range dimensions).
      if (!selection.rangeCount) {
        return;
      }
      // Technically, a selection can have multiple ranges, as defined in the
      // "Selection.rangeCount" property; but, for the most part, we are only going
      // to deal with the first (and often only) selection range.
      const topDefault = 30;
      const rangeToolBar = selection.getRangeAt(0);
      const editorForm = document.getElementById("editor-form");
      const editorFormTop = editorForm.getBoundingClientRect().top + 20;
      const editorFormLeft = editorForm.getBoundingClientRect().left;
      const topToolBar =
        rangeToolBar.getBoundingClientRect().top - editorFormTop - topDefault;
      let leftToolBar =
        rangeToolBar.getBoundingClientRect().left - editorFormLeft;
      // check toolbar left in editor
      const contentEditor = document.getElementById("content-editor");
      if (toolBar && toolBar.style) {
        toolBar.style.display = "inline-block";
        toolBar.style.position = "absolute";
        if (contentEditor && toolBar) {
          const widthOfContentEditor = contentEditor.offsetWidth;
          const widthOfToolBar = toolBar.offsetWidth;
          if (widthOfContentEditor - widthOfToolBar <= leftToolBar) {
            leftToolBar = widthOfContentEditor - widthOfToolBar;
          }
        }
        toolBar.style.top = topToolBar.toString() + "px";
        toolBar.style.left = leftToolBar.toString() + "px";
      }
    } else {
      const toolBar = document.getElementById("toolBar");
      if (toolBar && toolBar.style) {
        toolBar.style.left = "0";
        toolBar.style.top = "0";
        toolBar.style.display = "none";
      }
    }
    return e;
  };

  removeAllClassActive = () => {
    document.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
  };

  removeOrAddClassActive = (id) => {
    const elementClass = document.getElementById(id);
    if (elementClass && elementClass.classList) {
      if (elementClass.classList.contains("active")) {
        elementClass.classList.remove("active");
      } else {
        elementClass.classList.add("active");
      }
    }
  };

  checkAlign = (currentNodeHTML) => {
    if (
      currentNodeHTML &&
      currentNodeHTML.style &&
      currentNodeHTML.style !== ""
    ) {
      if (currentNodeHTML.style["text-align"] === "center") {
        this.removeOrAddClassActive("align-center");
      }
      if (currentNodeHTML.style["text-align"] === "left") {
        this.removeOrAddClassActive("align-left");
      }
      if (currentNodeHTML.style["text-align"] === "right") {
        this.removeOrAddClassActive("align-right");
      }
    }
  };

  getListTagCurrent = () => {
    this.removeAllClassActive();
    // this.clearSelected();
    const result: string[] = [];
    if (!(this.currentNodeHTML && this.currentNodeHTML.firstChild)) {
      return;
    }
    let node = this.currentNodeHTML.firstChild;
    let nodeParent = this.currentNodeHTML;
    // find root element
    while (nodeParent) {
      if (
        nodeParent === null ||
        nodeParent.parentNode === null ||
        nodeParent.parentNode.className === "body-content-editor"
      ) {
        break;
      }
      if (nodeParent.parentNode.nodeName === "DIV") {
        nodeParent = nodeParent.parentNode;
        break;
      }
      nodeParent = nodeParent.parentNode;
    }
    node = nodeParent;
    this.checkAlign(node);
    while (node) {
      if (node !== this && node.nodeType === Node.ELEMENT_NODE) {
        result.push(node);
      }
      this.checkAlign(node.firstChild);
      node = node.firstChild;
    }
    this.parentNodesCurrent = result;
    this.findAndActiveSelected();
  };

  clearSelected = () => {
    // @ts-ignore
    document.getElementById("FormatText").value = false;
    // @ts-ignore
    document.getElementById("FormatFont").value = false;
    // @ts-ignore
    document.getElementById("FormatSize").value = false;
    // @ts-ignore
    document.getElementById("FormatBackgroundColor").value = false;
    // @ts-ignore
    document.getElementById("FormatColor").value = false;
  };

  findAndActiveSelected = () => {
    let {
      FormatTexts,
      FormatFonts,
      FormatSizes,
      FormatBackgroundColors,
      FormatColors,
    } = configEditor.config;
    FormatTexts = FormatTexts.map((item) => item.value);
    FormatFonts = FormatFonts.map((item) => item.value);
    FormatSizes = FormatSizes.map((item) => item.value);
    FormatBackgroundColors = FormatBackgroundColors.map((item) => item.value);
    FormatColors = FormatColors.map((item) => item.value);
    // @ts-ignore
    // for (const _node: Node of this.parentNodesCurrent) {
    //   // @ts-ignore
    //   const nodeName = _node.nodeName;
    //   const formatText = FormatTexts.filter(
    //     (str) => str === nodeName.toLowerCase()
    //   );
    //   const formatFont = FormatFonts.filter(
    //     (str) => str === nodeName.toLowerCase()
    //   );
    //   // @ts-ignore
    //   const formatSize = FormatSizes.filter(
    //     (str) => str === _node.getAttribute("size")
    //   );
    //   // @ts-ignore
    //   const formatBackgroundColor = FormatBackgroundColors.filter(
    //     (str) => str === _node.style["background-color"]
    //   );
    //   // @ts-ignore
    //   const formatColors = FormatColors.filter(
    //     (str) => str === _node.getAttribute("color")
    //   );
    //   if (formatText.length > 0) {
    //     // @ts-ignore
    //     document.getElementById("FormatText").value = formatText[0];
    //   }
    //   if (formatFont.length > 0 && document.getElementById("FormatFont")) {
    //     // @ts-ignore
    //     document.getElementById("FormatFont").value = formatFont[0];
    //   }
    //   if (formatSize.length > 0 && document.getElementById("FormatSize")) {
    //     // @ts-ignore
    //     document.getElementById("FormatSize").value = formatSize[0];
    //   }
    //   // @ts-ignore
    //   if (
    //     formatBackgroundColor.length > 0 &&
    //     document.getElementById("FormatBackgroundColor")
    //   ) {
    //     // @ts-ignore
    //     document.getElementById("FormatBackgroundColor").value =
    //       formatBackgroundColor[0];
    //   }
    //   if (formatColors.length > 0 && document.getElementById("FormatColor")) {
    //     // @ts-ignore
    //     document.getElementById("FormatColor").value = formatColors[0];
    //   }
    //   if (nodeName === "B") {
    //     this.removeOrAddClassActive("bold");
    //   }
    //   if (nodeName === "I") {
    //     this.removeOrAddClassActive("italic");
    //   }
    //   if (nodeName === "U") {
    //     this.removeOrAddClassActive("underline");
    //   }
    //   if (nodeName === "UL") {
    //     this.removeOrAddClassActive("list-ul");
    //   }
    //   if (nodeName === "OL") {
    //     this.removeOrAddClassActive("list-ol");
    //   }
    //   if (nodeName === "BLOCKQUOTE") {
    //     this.removeOrAddClassActive("list-ol");
    //   }
    //   if (nodeName === "A") {
    //     this.removeOrAddClassActive("slink");
    //   }
    // }
  };

  convertToHTML = (item) => {
    return `<p className="${item.value}">${item.text}</p>`;
  };

  formatDoc = (e, sCmd?, sValue?) => {
    e.preventDefault();
    if (this.validateMode()) {
      this.getListTagCurrent();
      document.execCommand(sCmd, false, sValue);
      this.oDoc.current.focus();
    }
  };

  validateMode = () => {
    if (!this.switchMode.checked) {
      return true;
    }
    alert('Uncheck "Show HTML".');
    this.oDoc.current.focus();
    return false;
  };

  addHyperLinkToolBar = (e) => {
    e.preventDefault();
    const state = this.state.showToolbar;
    const _this = this;
    const sLnk1 = null;
    const sLnk = document.getElementById("sLnk");
    if (sLnk != null) {
      // @ts-ignore
      this.setState({ showToolbar: !state }, () => {
        if (!this.state.showToolbar) {
          // is close toolbar
          _this.addHyperLink(e, sLnk["value"], "createLink");
        }
      });
    }
  };

  toggleHyperLinkToolBar = (e) => {
    e.preventDefault();
    const state = this.state.showToolbar;
    const _this = this;
    const sLnk = document.getElementById("sLnk");
    const buttonSlink = document.getElementById("slink");
    if (buttonSlink != null) {
      if (buttonSlink.classList && buttonSlink.classList.contains("active")) {
        _this.addHyperLink(e, "unlink", "unlink");
      } else {
        // @ts-ignore
        this.setState({ showToolbar: !state }, () => {
          if (!this.state.showToolbar) {
            // is close toolbar
            if (sLnk && sLnk["value"]) {
              _this.addHyperLink(e, sLnk["value"], "createLink");
            }
          }
        });
      }
    }
  };

  getXPath(node) {
    if (node.hasAttribute("id")) {
      return "//" + node.tagName + '[@id="' + node.id + '"]';
    }

    if (node.hasAttribute("class")) {
      return (
        "//" + node.tagName + '[@class="' + node.getAttribute("class") + '"]'
      );
    }

    const old = "/" + node.tagName;
    const new_path = this.getXPath(node.parentNode) + old;

    return new_path;
  }

  addHyperLink = (e, sLnk, commandId) => {
    if (sLnk && sLnk.length > 0) {
      // && (sLnk.includes('http://') || sLnk.includes('https://'))
      if (this.state.selectionCreateRange) {
        this.restoreSelectionForCreateRange(
          document.getElementById("content-editor"),
          this.state.savedSelection
        );
      } else {
        this.restoreSelectionForCreateTextRange(
          document.getElementById("content-editor"),
          this.state.savedSelection
        );
      }
      this.oDoc.current.focus();
      if (commandId === "unlink") {
        // @ts-ignore
        document.execCommand(commandId, false, false);
      } else {
        document.execCommand(commandId, false, sLnk);
      }
    }
  };

  setDocMode = () => {
    const bToSource = this.switchMode.current.checked;
    let oContent;
    if (bToSource) {
      oContent = document.createTextNode(this.oDoc.current.innerHTML);
      this.oDoc.current.innerHTML = "";
      const oPre = document.createElement("div");
      this.oDoc.current.contentEditable = false;
      oPre.id = "sourceText";
      oPre.contentEditable = "true";
      oPre.style.height = "100%";
      oPre.appendChild(oContent);
      this.oDoc.current.appendChild(oPre);
      document.execCommand("defaultParagraphSeparator", false, "div");
    } else {
      if (document.all) {
        this.oDoc.current.innerHTML = this.oDoc.current.innerText;
      } else {
        // remove pre tag when content is empty
        oContent = document.createRange();
        oContent.selectNodeContents(this.oDoc.current.firstChild);
        this.oDoc.current.innerHTML = oContent.toString();
      }
      this.oDoc.current.contentEditable = true;
    }
    this.oDoc.current.focus();
  };

  printDoc = () => {
    if (!this.validateMode()) {
      return;
    }
    const oPrntWin = window.open(
      "",
      "_blank",
      "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes"
    );
    oPrntWin.document.open();
    oPrntWin.document.write(
      '<!doctype html><html><head><title>Print</title></head><body onload="print();">' +
        this.oDoc.current.innerHTML +
        "</body></html>"
    );
    oPrntWin.document.close();
  };

  render() {
    const resource = storage.resource().resource();
    const {
      FormatTexts,
      FormatFonts,
      Formats,
      FormatSizes,
      FormatBackgroundColors,
      FormatColors,
    } = configEditor.config;
    // toolBar-text toolBar btn-group toolBar-button
    // @ts-ignore
    // @ts-ignore
    return (
      <div>
        <div id="editor-form" className="editor-form">
          <div className="body-content-editor">
            <div id="toolBar" className={""}>
              {!this.state.showToolbar ? (
                <div className={"toolBar btn-group toolBar-button"}>
                  <div className={"input-group"}>
                    <select
                      name="FormatText"
                      id="FormatText"
                      onChange={($event) => {
                        this.formatDoc(
                          $event,
                          "formatblock",
                          $event.target.value
                        );
                        this.hasTagNameFormatText("H1");
                      }}
                      className="custom-select"
                    >
                      {FormatTexts &&
                        FormatTexts.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                    </select>
                    <select
                      name="FormatFont"
                      id="FormatFont"
                      onChange={($event) => {
                        this.formatDoc($event, "fontname", $event.target.value);
                        this.getAttributeValue("face");
                      }}
                      placeholder="select font"
                      className="custom-select"
                    >
                      {FormatFonts &&
                        FormatFonts.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                    </select>
                    <select
                      name="FormatSize"
                      id="FormatSize"
                      onChange={($event) => {
                        this.formatDoc($event, "fontsize", $event.target.value);
                        this.getAttributeValue("size");
                      }}
                      className="custom-select"
                    >
                      {FormatSizes &&
                        FormatSizes.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                    </select>
                    <select
                      name="FormatColor"
                      id="FormatColor"
                      onChange={($event) => {
                        this.formatDoc(
                          $event,
                          "forecolor",
                          $event.target.value
                        );
                        this.getAttributeValue("color");
                      }}
                      className="custom-select"
                    >
                      {FormatColors &&
                        FormatColors.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                    </select>
                    <div className="input md-3">
                      <select
                        name="FormatBackgroundColor"
                        id="FormatBackgroundColor"
                        onChange={($event) => {
                          this.formatDoc(
                            $event,
                            "backcolor",
                            $event.target.value
                          );
                          this.getStyleValue(" background-color");
                        }}
                        className="custom-select"
                      >
                        {FormatBackgroundColors &&
                          FormatBackgroundColors.map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <button className="btn" type="button" onClick={this.printDoc}>
                    <i className="material-icons">print </i>
                  </button>
                  <button
                    className="btn "
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "undo");
                    }}
                  >
                    <i className="material-icons">undo </i>
                  </button>
                  <button
                    className="btn "
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "redo");
                    }}
                  >
                    <i className="material-icons">redo </i>
                  </button>
                  <button
                    className="btn "
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "removeFormat");
                    }}
                  >
                    <i className="material-icons">format_clear </i>
                  </button>
                  <button
                    id="bold"
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "bold");
                    }}
                    className={"btn " + this.hasTagName("B")}
                  >
                    <i className="material-icons">format_bold </i>
                  </button>
                  <button
                    id="italic"
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "italic");
                    }}
                    className={"btn " + this.hasTagName("I")}
                  >
                    <i className="material-icons">format_italic </i>
                  </button>
                  <button
                    id="underline"
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "underline");
                    }}
                    className={"btn " + this.hasTagName("U")}
                  >
                    <i className="material-icons">format_underlined </i>
                  </button>
                  <button
                    id="align-left"
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "justifyleft");
                    }}
                    className={"btn " + this.hasStyle("text-align", "left")}
                  >
                    <i className="material-icons">format_align_left </i>
                  </button>
                  <button
                    id="align-center"
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "justifycenter");
                    }}
                    className={"btn " + this.hasStyle("text-align", "center")}
                  >
                    <i className="material-icons">format_align_center </i>
                  </button>
                  <button
                    id="align-right"
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "justifyright");
                    }}
                    className={"btn " + this.hasStyle("text-align", "right")}
                  >
                    <i className="material-icons">format_align_right </i>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "insertorderedlist");
                    }}
                    className={"btn " + this.hasTagName("OL")}
                  >
                    <i className="material-icons">format_list_numbered </i>
                  </button>
                  <button
                    id="list-ul"
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "insertunorderedlist");
                    }}
                    className={"btn " + this.hasTagName("UL")}
                  >
                    <i className="material-icons">format_list_bulleted </i>
                  </button>
                  <button
                    id="quote-left"
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "formatblock", "blockquote");
                    }}
                    className={"btn " + this.hasTagName("BLOCKQUOTE")}
                  >
                    <i className="material-icons">format_quote </i>
                  </button>
                  <button
                    id="outdent"
                    className="btn "
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "outdent");
                    }}
                  >
                    <i className="material-icons">format_indent_decrease </i>
                  </button>
                  <button
                    id="indent"
                    className="btn "
                    type="button"
                    onClick={(e) => {
                      this.formatDoc(e, "indent");
                    }}
                  >
                    <i className="material-icons">format_indent_increase </i>
                  </button>
                  <button
                    type="button"
                    id="slink"
                    onClick={this.toggleHyperLinkToolBar}
                    className={"btn " + this.hasTagName("a")}
                  >
                    {/*<i className='fa fa-link'/>*/}
                    <i className="material-icons">insert_link</i>
                  </button>
                </div>
              ) : (
                <div className={"input-link "}>
                  <label className="col s12 m6">
                    <input
                      type="text"
                      id="sLnk"
                      name="sLnk"
                      placeholder="Past or type link here...."
                    />
                    <i
                      className={"fa fa-times close"}
                      onClick={this.addHyperLinkToolBar}
                    />
                  </label>
                </div>
              )}
              <span className="highlightMenu-arrowClip" />
            </div>
            <div
              id="content-editor"
              className="textBox text-editor-body"
              contentEditable={!this.props.disabled}
              onInput={(e) => {
                this.onBlurChange();
              }}
              onBlur={this.onBlurChange}
              ref={this.oDoc}
              dangerouslySetInnerHTML={{ __html: this.props.html }}
              placeholder="Enter some text"
            />
          </div>
          <p className="editMode editor_bottom">
            <label>
              <input
                type="checkbox"
                name="switchMode"
                id="switchBox"
                onChange={this.setDocMode}
                disabled={this.props.disabled}
                ref={this.switchMode}
              />
              <i className="fa fa-code" />
              HTML
            </label>
          </p>
        </div>
      </div>
    );
  }
}

// @ts-ignore
TextEditorComponent.propTypes = {
  editorChange: PropTypes.func,
};
