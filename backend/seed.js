require('dotenv').config();
const mongoose = require('mongoose');
const Term = require('./models/Term');

const legalTerms = [
  // A
  {
    term: 'Acquittal',
    category: 'Criminal Law',
    definition:
      'A judgment of a court that a person accused of a crime is not guilty. An acquittal certifies that the accused is free from the charge of an offense.',
    example:
      'After reviewing all the evidence, the jury returned a verdict of acquittal for the defendant, finding him not guilty of the robbery.',
    relatedTerms: ['Verdict', 'Not Guilty', 'Exoneration'],
  },
  {
    term: 'Affidavit',
    category: 'Civil Procedure',
    definition:
      'A written statement made under oath before a notary public or other authorized officer. It is used as evidence in court proceedings.',
    example:
      'The witness submitted an affidavit detailing what she had seen on the night of the incident, sworn before a notary public.',
    relatedTerms: ['Deposition', 'Declaration', 'Oath'],
  },
  {
    term: 'Amicus Curiae',
    category: 'Civil Procedure',
    definition:
      'Latin for "friend of the court." A person or organization that is not a party to a case but files a brief to offer information or opinion to assist the court.',
    example:
      'Several civil liberties organizations filed amicus curiae briefs in the landmark Supreme Court case.',
    relatedTerms: ['Brief', 'Appellate Court', 'Intervenor'],
  },
  {
    term: 'Arraignment',
    category: 'Criminal Law',
    definition:
      'A formal reading of a criminal charging document in the presence of the defendant to inform the defendant of the charges against them. The defendant is asked to enter a plea.',
    example:
      'At the arraignment, the defendant was read the charges of first-degree murder and entered a plea of not guilty.',
    relatedTerms: ['Indictment', 'Plea', 'Criminal Charge'],
  },
  {
    term: 'Assault',
    category: 'Tort Law',
    definition:
      'An intentional act that causes a reasonable person to fear an imminent harmful or offensive contact. It does not require actual physical contact.',
    example:
      'Threatening someone with a raised fist in a menacing manner, even without touching them, can constitute assault.',
    relatedTerms: ['Battery', 'Tort', 'Threatening Behavior'],
  },
  {
    term: 'Attorney-Client Privilege',
    category: 'Evidence Law',
    definition:
      'A legal concept that protects communications between a client and their attorney from being disclosed without the client\'s consent. It ensures confidential legal advice.',
    example:
      'The lawyer refused to reveal what her client had told her during their meeting, citing attorney-client privilege.',
    relatedTerms: ['Privilege', 'Confidentiality', 'Legal Counsel'],
  },
  // B
  {
    term: 'Bail',
    category: 'Criminal Law',
    definition:
      'The temporary release of an accused person awaiting trial, sometimes on condition that a sum of money is lodged to guarantee their appearance in court.',
    example:
      'The judge set bail at $50,000, and the defendant was released after the amount was posted by his family.',
    relatedTerms: ['Bond', 'Recognizance', 'Pretrial Release'],
  },
  {
    term: 'Battery',
    category: 'Tort Law',
    definition:
      'The intentional and unlawful physical contact or touching of another person without their consent. Unlike assault, battery requires actual physical contact.',
    example:
      'When the attacker struck the victim with his fist, he committed battery in addition to the crime of assault.',
    relatedTerms: ['Assault', 'Tort', 'Physical Contact'],
  },
  {
    term: 'Bench Trial',
    category: 'Civil Procedure',
    definition:
      'A trial in which the judge alone decides the facts of the case, without a jury. The judge acts as both the trier of fact and the decider of legal questions.',
    example:
      'The defendant waived his right to a jury trial, and the case proceeded as a bench trial before the district court judge.',
    relatedTerms: ['Jury Trial', 'Trier of Fact', 'Judge'],
  },
  {
    term: 'Beyond a Reasonable Doubt',
    category: 'Criminal Law',
    definition:
      'The standard of proof required to convict a person of a crime. The prosecution must establish that there is no reasonable doubt in the mind of a reasonable person that the defendant is guilty.',
    example:
      'The prosecutor must prove beyond a reasonable doubt that the defendant committed the crime; any reasonable uncertainty must result in acquittal.',
    relatedTerms: ['Burden of Proof', 'Preponderance of Evidence', 'Standard of Proof'],
  },
  {
    term: 'Breach of Contract',
    category: 'Contract Law',
    definition:
      'The violation of any of the agreed-upon terms and conditions of a binding contract. A breach can be material or minor, and entitles the non-breaching party to remedies.',
    example:
      'When the contractor failed to complete the building on time, they committed a breach of contract, entitling the owner to damages.',
    relatedTerms: ['Contract', 'Damages', 'Remedy'],
  },
  // C
  {
    term: 'Causation',
    category: 'Tort Law',
    definition:
      'The relationship between an act and the resulting harm. In legal contexts, there are two types: actual cause (cause-in-fact) and proximate cause (legal cause).',
    example:
      'To succeed in the negligence claim, the plaintiff must prove causation — that the defendant\'s actions directly caused her injuries.',
    relatedTerms: ['Negligence', 'Proximate Cause', 'Tort'],
  },
  {
    term: 'Certiorari',
    category: 'Appellate Law',
    definition:
      'A writ by which a higher court reviews a decision of a lower court. The Supreme Court grants certiorari when it agrees to hear an appeal.',
    example:
      'The losing party petitioned the Supreme Court for a writ of certiorari, hoping the Court would review the lower court\'s ruling.',
    relatedTerms: ['Appeal', 'Writ', 'Supreme Court'],
  },
  {
    term: 'Civil Law',
    category: 'General Law',
    definition:
      'The body of law dealing with private rights of individuals, as distinguished from criminal law. It governs disputes between individuals or organizations.',
    example:
      'A person who suffers personal injury due to another\'s negligence may bring a civil law lawsuit to recover monetary damages.',
    relatedTerms: ['Criminal Law', 'Tort Law', 'Contract Law'],
  },
  {
    term: 'Class Action',
    category: 'Civil Procedure',
    definition:
      'A lawsuit filed by one or more plaintiffs on behalf of a large group who share a common legal issue or claim against the same defendant.',
    example:
      'Thousands of consumers who bought the defective product joined a class action lawsuit against the manufacturer.',
    relatedTerms: ['Plaintiff', 'Lawsuit', 'Representative Action'],
  },
  {
    term: 'Contempt of Court',
    category: 'Civil Procedure',
    definition:
      'Willful disobedience of a court order or conduct that disrespects the authority of the court. It can be civil or criminal and carries penalties including fines or imprisonment.',
    example:
      'The witness was held in contempt of court for refusing to answer questions on the stand despite a court order to do so.',
    relatedTerms: ['Court Order', 'Sanction', 'Disobedience'],
  },
  {
    term: 'Contract',
    category: 'Contract Law',
    definition:
      'A legally binding agreement between two or more parties that is enforceable by law. A valid contract requires offer, acceptance, consideration, and mutual assent.',
    example:
      'The two companies signed a contract specifying the services to be provided, the timeline, and the agreed payment terms.',
    relatedTerms: ['Offer', 'Acceptance', 'Consideration', 'Breach of Contract'],
  },
  {
    term: 'Conviction',
    category: 'Criminal Law',
    definition:
      'A formal declaration by a court that someone is guilty of a criminal offense. It typically follows a guilty verdict by a jury or a guilty plea.',
    example:
      'Following a two-week trial, the jury returned a conviction on all three counts of fraud against the defendant.',
    relatedTerms: ['Verdict', 'Sentence', 'Acquittal'],
  },
  // D
  {
    term: 'Damages',
    category: 'Tort Law',
    definition:
      'Money awarded by a court to compensate a person who has been harmed by the actions of another. Types include compensatory, punitive, and nominal damages.',
    example:
      'The court awarded $500,000 in damages to the plaintiff to compensate for her medical bills, lost wages, and pain and suffering.',
    relatedTerms: ['Compensatory Damages', 'Punitive Damages', 'Remedy'],
  },
  {
    term: 'Defamation',
    category: 'Tort Law',
    definition:
      'The act of making false statements about a person that damage their reputation. Written defamation is libel; spoken defamation is slander.',
    example:
      'The newspaper published false accusations that the businessman had committed fraud, leading him to file a defamation lawsuit.',
    relatedTerms: ['Libel', 'Slander', 'Reputational Harm'],
  },
  {
    term: 'Defendant',
    category: 'General Law',
    definition:
      'The person or entity against whom a lawsuit or criminal charge is brought. In criminal cases, the defendant is accused of committing a crime.',
    example:
      'The defendant in the personal injury case was the driver whose negligence caused the accident.',
    relatedTerms: ['Plaintiff', 'Accused', 'Respondent'],
  },
  {
    term: 'Deposition',
    category: 'Civil Procedure',
    definition:
      'Out-of-court testimony of a witness, recorded under oath. Depositions are used in the discovery process to gather information before trial.',
    example:
      'During the deposition, the expert witness was questioned by both attorneys about her findings in the product liability case.',
    relatedTerms: ['Discovery', 'Affidavit', 'Testimony'],
  },
  {
    term: 'Discovery',
    category: 'Civil Procedure',
    definition:
      'The pre-trial process by which parties to a lawsuit obtain relevant information and evidence from each other. It includes depositions, interrogatories, and document requests.',
    example:
      'During discovery, the plaintiff requested all internal emails related to the product defect from the defendant corporation.',
    relatedTerms: ['Deposition', 'Interrogatory', 'Subpoena'],
  },
  {
    term: 'Double Jeopardy',
    category: 'Constitutional Law',
    definition:
      'A legal protection that prevents a person from being tried twice for the same crime once they have been acquitted or convicted.',
    example:
      'After being acquitted of murder, the defendant could not be tried again for the same killing due to the protection against double jeopardy.',
    relatedTerms: ['Fifth Amendment', 'Acquittal', 'Criminal Prosecution'],
  },
  {
    term: 'Due Process',
    category: 'Constitutional Law',
    definition:
      'The constitutional guarantee that the government will not deprive any person of life, liberty, or property without fair legal procedures and safeguards.',
    example:
      'The prisoner argued his sentence was unconstitutional because he was not given the opportunity to present a defense, violating due process.',
    relatedTerms: ['Fifth Amendment', 'Fourteenth Amendment', 'Constitutional Rights'],
  },
  // E
  {
    term: 'Easement',
    category: 'Property Law',
    definition:
      'A nonpossessory right to use another person\'s land for a specific and limited purpose. Common types include easements for access, utilities, or drainage.',
    example:
      'The neighboring farmer had an easement allowing him to cross the landowner\'s field to reach the public road.',
    relatedTerms: ['Property Rights', 'Servitude', 'Right-of-Way'],
  },
  {
    term: 'Eminent Domain',
    category: 'Property Law',
    definition:
      'The power of the government to take private property for public use, provided just compensation is paid to the property owner.',
    example:
      'The city exercised eminent domain to acquire parcels of land needed for the new highway, compensating each property owner.',
    relatedTerms: ['Just Compensation', 'Condemnation', 'Fifth Amendment'],
  },
  {
    term: 'Equity',
    category: 'General Law',
    definition:
      'A branch of law developed to supplement the common law where it produced harsh results. Equity focuses on fairness and allows courts to grant remedies such as injunctions.',
    example:
      'The plaintiff sought an equitable remedy in the form of an injunction to stop the defendant from building a fence that would block access.',
    relatedTerms: ['Injunction', 'Common Law', 'Remedy'],
  },
  {
    term: 'Evidence',
    category: 'Evidence Law',
    definition:
      'Information or facts presented in a court case that are used to prove or disprove allegations. Evidence can be testimonial, documentary, physical, or demonstrative.',
    example:
      'The prosecution presented DNA evidence, eyewitness testimony, and surveillance footage as evidence of the defendant\'s guilt.',
    relatedTerms: ['Testimony', 'Admissibility', 'Proof'],
  },
  {
    term: 'Extradition',
    category: 'International Law',
    definition:
      'The legal process by which a person accused or convicted of a crime in one jurisdiction is transferred to another jurisdiction for trial or punishment.',
    example:
      'The fugitive who fled to another country was extradited back to face trial after the two governments signed an extradition treaty.',
    relatedTerms: ['Fugitive', 'Treaty', 'Criminal Jurisdiction'],
  },
  // F
  {
    term: 'Felony',
    category: 'Criminal Law',
    definition:
      'A serious crime, typically punishable by imprisonment of more than one year in a state or federal prison. Examples include murder, rape, and robbery.',
    example:
      'Armed robbery is classified as a felony, and the convicted defendant received a sentence of ten years in state prison.',
    relatedTerms: ['Misdemeanor', 'Crime', 'Sentence'],
  },
  {
    term: 'Fiduciary',
    category: 'Business Law',
    definition:
      'A person or entity that holds a position of trust and is legally obligated to act in the best interest of another party. Examples include trustees, attorneys, and corporate officers.',
    example:
      'As a trustee, she had a fiduciary duty to manage the trust assets solely in the best interest of the beneficiaries.',
    relatedTerms: ['Trust', 'Duty of Care', 'Conflict of Interest'],
  },
  {
    term: 'Fraud',
    category: 'Criminal Law',
    definition:
      'Intentional deception made for personal gain or to damage another. It involves knowingly making a false representation that causes damages to another person.',
    example:
      'The accountant committed fraud by falsifying financial records to hide the embezzlement of company funds.',
    relatedTerms: ['Misrepresentation', 'Deceit', 'White-Collar Crime'],
  },
  // G
  {
    term: 'Grand Jury',
    category: 'Criminal Law',
    definition:
      'A group of citizens convened to determine whether sufficient evidence exists to formally charge a person with a crime. Grand juries operate in secret and do not determine guilt.',
    example:
      'After hearing the evidence, the grand jury issued an indictment, allowing the prosecution to proceed to trial.',
    relatedTerms: ['Indictment', 'Jury', 'Probable Cause'],
  },
  {
    term: 'Guardian ad Litem',
    category: 'Family Law',
    definition:
      'A person appointed by the court to represent the interests of a minor or incapacitated person in legal proceedings.',
    example:
      'The court appointed a guardian ad litem to represent the child\'s interests during the contentious custody dispute.',
    relatedTerms: ['Minor', 'Custody', 'Court Appointment'],
  },
  // H
  {
    term: 'Habeas Corpus',
    category: 'Constitutional Law',
    definition:
      'A legal action by which a person detained by the government can seek relief from unlawful imprisonment. It requires the detaining authority to justify the detention before a court.',
    example:
      'The prisoner filed a writ of habeas corpus, claiming his constitutional rights were violated during his trial and that his imprisonment was unlawful.',
    relatedTerms: ['Writ', 'Imprisonment', 'Constitutional Rights'],
  },
  {
    term: 'Hearsay',
    category: 'Evidence Law',
    definition:
      'An out-of-court statement made by someone other than the testifying witness, offered in court to prove the truth of the matter asserted. Generally inadmissible unless an exception applies.',
    example:
      'The judge ruled the testimony inadmissible as hearsay because the witness was repeating what someone else told her, not what she observed herself.',
    relatedTerms: ['Evidence', 'Admissibility', 'Testimony'],
  },
  {
    term: 'Homicide',
    category: 'Criminal Law',
    definition:
      'The killing of one human being by another. Homicide is not always criminal — it can be justifiable (self-defense) or excusable. Criminal homicide includes murder and manslaughter.',
    example:
      'The police classified the death as a homicide after evidence suggested the victim was killed by a third party.',
    relatedTerms: ['Murder', 'Manslaughter', 'Self-Defense'],
  },
  // I
  {
    term: 'Immunity',
    category: 'Criminal Law',
    definition:
      'Protection from legal prosecution or liability. Prosecutors may grant immunity to a witness in exchange for their testimony against another party.',
    example:
      'The key witness agreed to testify only after the prosecutor granted him immunity from prosecution for his own involvement.',
    relatedTerms: ['Prosecution', 'Fifth Amendment', 'Witness'],
  },
  {
    term: 'Indictment',
    category: 'Criminal Law',
    definition:
      'A formal charge or accusation of a serious crime. In the federal system, an indictment is issued by a grand jury after finding probable cause that a crime was committed.',
    example:
      'The grand jury handed down a ten-count indictment against the former executive for conspiracy and securities fraud.',
    relatedTerms: ['Grand Jury', 'Charge', 'Arraignment'],
  },
  {
    term: 'Injunction',
    category: 'Civil Procedure',
    definition:
      'A court order requiring a person or entity to do something or refrain from doing something. Injunctions can be temporary (preliminary) or permanent.',
    example:
      'The court issued a temporary injunction preventing the company from releasing the product until the patent dispute was resolved.',
    relatedTerms: ['Restraining Order', 'Equity', 'Court Order'],
  },
  {
    term: 'Interrogatory',
    category: 'Civil Procedure',
    definition:
      'A set of written questions submitted by one party in a lawsuit to another party, which must be answered in writing under oath during the discovery phase.',
    example:
      'The plaintiff served the defendant with 25 interrogatories seeking details about the company\'s product testing procedures.',
    relatedTerms: ['Discovery', 'Deposition', 'Written Discovery'],
  },
  // J
  {
    term: 'Judgment',
    category: 'Civil Procedure',
    definition:
      'The official decision of a court resolving the issues in a lawsuit and determining the rights and obligations of the parties.',
    example:
      'The court entered a judgment in favor of the plaintiff for $1.2 million in compensatory and punitive damages.',
    relatedTerms: ['Verdict', 'Ruling', 'Decision'],
  },
  {
    term: 'Jurisdiction',
    category: 'General Law',
    definition:
      'The legal authority of a court to hear and decide a case. Jurisdiction is based on the nature of the case (subject matter) and the location of the parties or events (personal/geographic).',
    example:
      'The federal court determined it had jurisdiction over the case because it involved a federal law and parties from different states.',
    relatedTerms: ['Venue', 'Subject Matter Jurisdiction', 'Personal Jurisdiction'],
  },
  {
    term: 'Jury',
    category: 'General Law',
    definition:
      'A group of citizens sworn to apply the law, as directed by the judge, to the facts of a case and return a verdict. In criminal cases, a jury typically consists of 12 people.',
    example:
      'After three days of deliberation, the jury reached a unanimous verdict of guilty on the charge of second-degree murder.',
    relatedTerms: ['Verdict', 'Deliberation', 'Trial'],
  },
  // L
  {
    term: 'Liability',
    category: 'Tort Law',
    definition:
      'Legal responsibility for one\'s actions or omissions. A party found liable may be required to compensate another party for harm caused.',
    example:
      'The construction company was found to have liability for the worker\'s injuries because of their failure to provide proper safety equipment on site.',
    relatedTerms: ['Negligence', 'Damages', 'Responsibility'],
  },
  {
    term: 'Libel',
    category: 'Tort Law',
    definition:
      'A form of defamation that involves the publication of false statements in written or another fixed media form that damages a person\'s reputation.',
    example:
      'The celebrity sued the tabloid for libel after it published a story falsely claiming she had committed financial crimes.',
    relatedTerms: ['Defamation', 'Slander', 'Reputational Harm'],
  },
  {
    term: 'Lien',
    category: 'Property Law',
    definition:
      'A legal claim or right against a property as security for a debt or obligation. A lien holder has the right to sell the property to satisfy the debt if unpaid.',
    example:
      'The contractor placed a mechanic\'s lien on the homeowner\'s property after the homeowner failed to pay for the renovation work.',
    relatedTerms: ['Security Interest', 'Mortgage', 'Creditor'],
  },
  // M
  {
    term: 'Mens Rea',
    category: 'Criminal Law',
    definition:
      'Latin for "guilty mind." The criminal intent or knowledge that a person must have had at the time of committing a crime. It is one of the key elements of criminal liability.',
    example:
      'For the theft conviction to stand, the prosecutor had to prove the defendant had the mens rea — knowingly intending to steal the property.',
    relatedTerms: ['Actus Reus', 'Intent', 'Criminal Liability'],
  },
  {
    term: 'Miranda Rights',
    category: 'Criminal Law',
    definition:
      'Rights that must be read to a criminal suspect in custody before interrogation. They include the right to remain silent and the right to an attorney.',
    example:
      'After the arrest, the officer read the suspect his Miranda rights, warning him that anything he said could be used against him in court.',
    relatedTerms: ['Fifth Amendment', 'Right to Counsel', 'Custodial Interrogation'],
  },
  {
    term: 'Misdemeanor',
    category: 'Criminal Law',
    definition:
      'A lesser criminal act, less serious than a felony, typically punishable by a fine or imprisonment of up to one year in a local or county jail.',
    example:
      'Petty theft of a small amount of merchandise was charged as a misdemeanor, and the defendant was sentenced to 30 days in county jail.',
    relatedTerms: ['Felony', 'Crime', 'Sentence'],
  },
  {
    term: 'Motion',
    category: 'Civil Procedure',
    definition:
      'A formal request made to a court asking for a specific ruling or order. Motions can be filed before, during, or after a trial.',
    example:
      'The defense attorney filed a motion to suppress the evidence, arguing it was obtained through an illegal search.',
    relatedTerms: ['Pleading', 'Court Order', 'Brief'],
  },
  {
    term: 'Murder',
    category: 'Criminal Law',
    definition:
      'The unlawful killing of a human being with malice aforethought. First-degree murder involves premeditation; second-degree murder does not require advance planning.',
    example:
      'The prosecution argued that the premeditated nature of the killing justified the charge of first-degree murder.',
    relatedTerms: ['Homicide', 'Manslaughter', 'Mens Rea'],
  },
  // N
  {
    term: 'Negligence',
    category: 'Tort Law',
    definition:
      'Failure to exercise the standard of care that a reasonably prudent person would exercise in similar circumstances. Negligence is a basis for civil liability when it causes harm.',
    example:
      'The driver who ran a red light was found negligent because a reasonable driver would have stopped at the signal.',
    relatedTerms: ['Duty of Care', 'Breach', 'Causation', 'Damages'],
  },
  {
    term: 'Non Compos Mentis',
    category: 'Criminal Law',
    definition:
      'Latin for "not of sound mind." A legal term describing a person who is mentally incapable of managing their own affairs or understanding legal proceedings.',
    example:
      'The defendant was found non compos mentis and therefore not competent to stand trial until mental health treatment restored his capacity.',
    relatedTerms: ['Insanity Defense', 'Competency', 'Mental Capacity'],
  },
  // O
  {
    term: 'Oath',
    category: 'Evidence Law',
    definition:
      'A solemn promise, often invoking a divine witness, regarding one\'s testimony. Giving false testimony under oath constitutes perjury.',
    example:
      'The witness took an oath to tell the truth, the whole truth, and nothing but the truth before giving her testimony.',
    relatedTerms: ['Affirmation', 'Perjury', 'Testimony'],
  },
  {
    term: 'Objection',
    category: 'Civil Procedure',
    definition:
      'A formal protest made during trial by an attorney, challenging the admissibility of evidence or the propriety of a question. The judge rules the objection sustained or overruled.',
    example:
      'The defense attorney yelled "Objection, hearsay!" when the prosecutor asked the witness to relay a conversation she overheard.',
    relatedTerms: ['Sustained', 'Overruled', 'Admissibility'],
  },
  // P
  {
    term: 'Parole',
    category: 'Criminal Law',
    definition:
      'The conditional release of a prisoner before the completion of their sentence, subject to monitoring and compliance with certain conditions.',
    example:
      'After serving seven years, the prisoner was released on parole with conditions including regular check-ins with a parole officer.',
    relatedTerms: ['Probation', 'Sentence', 'Conditional Release'],
  },
  {
    term: 'Perjury',
    category: 'Criminal Law',
    definition:
      'The criminal offense of making false statements under oath in a judicial proceeding. Perjury can result in criminal prosecution and imprisonment.',
    example:
      'The witness was charged with perjury after it was discovered that his testimony at trial directly contradicted his sworn deposition.',
    relatedTerms: ['Oath', 'Testimony', 'Obstruction of Justice'],
  },
  {
    term: 'Plaintiff',
    category: 'General Law',
    definition:
      'The party who initiates a lawsuit by filing a complaint against another party (the defendant) in a court of law.',
    example:
      'The plaintiff filed suit against the hospital, claiming medical negligence caused permanent injury to her arm.',
    relatedTerms: ['Defendant', 'Complaint', 'Lawsuit'],
  },
  {
    term: 'Plea Bargain',
    category: 'Criminal Law',
    definition:
      'An agreement in a criminal case between the prosecutor and the defendant, in which the defendant agrees to plead guilty, often in exchange for a lesser charge or reduced sentence.',
    example:
      'Rather than risk trial on a felony charge, the defendant accepted a plea bargain to plead guilty to a lesser misdemeanor offense.',
    relatedTerms: ['Guilty Plea', 'Prosecutor', 'Sentence'],
  },
  {
    term: 'Power of Attorney',
    category: 'Civil Law',
    definition:
      'A legal document authorizing one person (the agent or attorney-in-fact) to act on behalf of another person (the principal) in legal or financial matters.',
    example:
      'The elderly woman granted her daughter power of attorney so her daughter could manage her bank accounts and medical decisions.',
    relatedTerms: ['Agency', 'Principal', 'Legal Authority'],
  },
  {
    term: 'Precedent',
    category: 'General Law',
    definition:
      'A prior court decision that serves as an authority for deciding later cases involving similar facts or legal issues. Courts are generally bound to follow precedent under the doctrine of stare decisis.',
    example:
      'The attorney argued that the court should follow the precedent set by the Supreme Court in the landmark civil rights case.',
    relatedTerms: ['Stare Decisis', 'Common Law', 'Case Law'],
  },
  {
    term: 'Probable Cause',
    category: 'Criminal Law',
    definition:
      'A reasonable belief, based on specific facts and circumstances, that a person has committed a crime or that evidence of a crime exists in a particular place.',
    example:
      'The officer needed probable cause — more than a hunch — to justify the arrest without a warrant.',
    relatedTerms: ['Search Warrant', 'Fourth Amendment', 'Reasonable Suspicion'],
  },
  {
    term: 'Probate',
    category: 'Estate Law',
    definition:
      'The legal process of administering the estate of a deceased person, resolving any claims against it, and distributing the remaining assets to beneficiaries.',
    example:
      'After her father passed away, she had to go through probate court to validate his will and transfer the property to the heirs.',
    relatedTerms: ['Will', 'Estate', 'Executor'],
  },
  {
    term: 'Probation',
    category: 'Criminal Law',
    definition:
      'A period of supervision imposed by a court as an alternative to imprisonment, during which offenders must comply with conditions set by the court.',
    example:
      'The first-time offender was sentenced to two years of probation instead of jail time, with requirements to perform community service.',
    relatedTerms: ['Parole', 'Sentence', 'Supervised Release'],
  },
  // Q
  {
    term: 'Qualified Immunity',
    category: 'Constitutional Law',
    definition:
      'A legal doctrine that shields government officials from civil liability unless their conduct violates clearly established statutory or constitutional rights.',
    example:
      'The police officer invoked qualified immunity to defend against the civil rights lawsuit, arguing no similar case had clearly established the conduct as unlawful.',
    relatedTerms: ['Civil Rights', 'Government Official', 'Liability'],
  },
  // R
  {
    term: 'Reasonable Doubt',
    category: 'Criminal Law',
    definition:
      'The standard of proof in criminal cases. A defendant must be acquitted if the evidence leaves a reasonable person with any reasonable doubt about the defendant\'s guilt.',
    example:
      'The jury acquitted the defendant because the lack of physical evidence left them with a reasonable doubt about whether he committed the crime.',
    relatedTerms: ['Beyond a Reasonable Doubt', 'Burden of Proof', 'Acquittal'],
  },
  {
    term: 'Restraining Order',
    category: 'Family Law',
    definition:
      'A court order requiring one party to keep a specific distance from another party and refrain from certain behaviors for the protection of a potential victim.',
    example:
      'The victim was granted a restraining order requiring the abuser to stay at least 500 feet from her home and workplace.',
    relatedTerms: ['Injunction', 'Protective Order', 'Domestic Violence'],
  },
  // S
  {
    term: 'Search and Seizure',
    category: 'Constitutional Law',
    definition:
      'The process by which law enforcement examines a person\'s property looking for evidence of criminal activity. Protected by the Fourth Amendment against unreasonable searches.',
    example:
      'Police obtained a search warrant before entering the suspect\'s apartment to perform a legal search and seizure of potential evidence.',
    relatedTerms: ['Fourth Amendment', 'Warrant', 'Probable Cause'],
  },
  {
    term: 'Self-Defense',
    category: 'Criminal Law',
    definition:
      'The legal justification for using reasonable force to protect oneself or others from imminent harm or unlawful force. The force used must be proportional to the threat.',
    example:
      'The defendant argued self-defense after stabbing the intruder who had threatened him with a knife inside his own home.',
    relatedTerms: ['Defense', 'Justification', 'Use of Force'],
  },
  {
    term: 'Settlement',
    category: 'Civil Procedure',
    definition:
      'An agreement reached between the parties in a lawsuit that resolves the dispute without a full trial. Most civil cases end in a negotiated settlement.',
    example:
      'After two years of litigation, the parties reached a $2 million out-of-court settlement just weeks before the scheduled trial date.',
    relatedTerms: ['Mediation', 'Arbitration', 'Resolution'],
  },
  {
    term: 'Slander',
    category: 'Tort Law',
    definition:
      'Oral or spoken defamation — the making of false, damaging statements about a person to third parties verbally.',
    example:
      'The politician sued a radio host for slander after the host falsely claimed on-air that she had taken bribes from lobbyists.',
    relatedTerms: ['Defamation', 'Libel', 'Reputation'],
  },
  {
    term: 'Statute',
    category: 'General Law',
    definition:
      'A written law passed by a legislative body such as Congress or a state legislature. Statutes define legal rights and obligations.',
    example:
      'The statute clearly prohibited discrimination in hiring based on race, gender, or religion in any business with more than 15 employees.',
    relatedTerms: ['Legislation', 'Ordinance', 'Code'],
  },
  {
    term: 'Statute of Limitations',
    category: 'Civil Procedure',
    definition:
      'A law that sets the maximum time after an event within which legal proceedings may be initiated. After the period expires, a claim is time-barred.',
    example:
      'The plaintiff\'s personal injury claim was dismissed because the statute of limitations had expired — the lawsuit was filed three years past the deadline.',
    relatedTerms: ['Time Bar', 'Laches', 'Filing Deadline'],
  },
  {
    term: 'Subpoena',
    category: 'Civil Procedure',
    definition:
      'A legal document ordering a person to appear in court to testify as a witness, or requiring the production of documents or other evidence.',
    example:
      'The attorney served a subpoena on the company\'s CEO, compelling her to appear in court and bring all relevant financial records.',
    relatedTerms: ['Discovery', 'Witness', 'Court Order'],
  },
  // T
  {
    term: 'Testimony',
    category: 'Evidence Law',
    definition:
      'Statements made by a witness under oath in a legal proceeding. Testimony is a form of evidence used to establish facts in a case.',
    example:
      'The eyewitness gave powerful testimony about seeing the defendant leave the scene of the crime minutes after the incident occurred.',
    relatedTerms: ['Witness', 'Evidence', 'Deposition'],
  },
  {
    term: 'Tort',
    category: 'Tort Law',
    definition:
      'A civil wrong that causes someone to suffer loss or harm, resulting in legal liability for the person who commits the tortious act. Torts are distinct from criminal wrongs.',
    example:
      'Negligently causing a car accident that injures another driver is a tort, for which the wrongdoer may be liable for damages.',
    relatedTerms: ['Negligence', 'Liability', 'Civil Wrong'],
  },
  {
    term: 'Trust',
    category: 'Estate Law',
    definition:
      'A legal arrangement in which one party (the trustee) holds property for the benefit of another (the beneficiary). Trusts are commonly used in estate planning.',
    example:
      'The millionaire established a trust to ensure his children would receive their inheritance in managed installments after he passed away.',
    relatedTerms: ['Trustee', 'Beneficiary', 'Estate Planning'],
  },
  // U
  {
    term: 'Unconscionable Contract',
    category: 'Contract Law',
    definition:
      'A contract that is so unfair or one-sided that it shocks the conscience of the court. Courts may refuse to enforce unconscionable contracts.',
    example:
      'The fine print in the loan agreement was so oppressive and exploitative that the court declared it an unconscionable contract and voided it.',
    relatedTerms: ['Contract', 'Equity', 'Void Contract'],
  },
  // V
  {
    term: 'Venue',
    category: 'Civil Procedure',
    definition:
      'The geographic location where a case is tried. Venue rules determine which specific court is the proper location for hearing a case.',
    example:
      'The defense filed a motion to change venue, arguing that pretrial publicity in the original location made a fair trial impossible.',
    relatedTerms: ['Jurisdiction', 'Forum', 'Change of Venue'],
  },
  {
    term: 'Verdict',
    category: 'Criminal Law',
    definition:
      'The formal decision made by a jury or judge at the conclusion of a trial on the questions of fact submitted to them. In criminal cases, verdicts are "guilty" or "not guilty."',
    example:
      'After ten hours of deliberation, the foreman announced the jury\'s verdict: not guilty on all counts.',
    relatedTerms: ['Judgment', 'Acquittal', 'Conviction'],
  },
  // W
  {
    term: 'Warrant',
    category: 'Criminal Law',
    definition:
      'A document issued by a judge authorizing law enforcement to conduct a search, make an arrest, or carry out some other action relating to the administration of justice.',
    example:
      'Police obtained an arrest warrant from the judge before bringing the suspect into custody on charges of grand larceny.',
    relatedTerms: ['Search Warrant', 'Arrest Warrant', 'Probable Cause'],
  },
  {
    term: 'Will (Testament)',
    category: 'Estate Law',
    definition:
      'A legal document in which a person (the testator) specifies how their property and assets should be distributed after their death.',
    example:
      'In her will, she left her house to her daughter, her savings equally to her two sons, and a charitable donation to the local hospital.',
    relatedTerms: ['Probate', 'Executor', 'Testator', 'Inheritance'],
  },
  {
    term: 'Witness',
    category: 'Evidence Law',
    definition:
      'A person who gives testimony under oath in a legal proceeding, either about facts they personally observed or as an expert on a relevant subject.',
    example:
      'The prosecution called three witnesses who each testified they had seen the defendant at the crime scene on the night of the incident.',
    relatedTerms: ['Testimony', 'Expert Witness', 'Subpoena'],
  },
  {
    term: 'Writ',
    category: 'General Law',
    definition:
      'A formal written order issued by a court directing a person to do or refrain from doing a specific act. Examples include writs of mandamus, certiorari, and habeas corpus.',
    example:
      'The attorney filed for a writ of mandamus to compel the government agency to release the public records it had unlawfully withheld.',
    relatedTerms: ['Court Order', 'Habeas Corpus', 'Certiorari'],
  },
  // X / Y / Z
  {
    term: 'Xenophobia Law',
    category: 'Civil Rights Law',
    definition:
      'Laws and legal provisions designed to prohibit or address discrimination, harassment, or hate crimes motivated by fear or hatred of people from other countries or cultures.',
    example:
      'The city enacted anti-discrimination protections under xenophobia law after a series of hate crimes targeting immigrant communities.',
    relatedTerms: ['Hate Crime', 'Discrimination', 'Civil Rights'],
  },
  {
    term: 'Yield of Possession',
    category: 'Property Law',
    definition:
      'The act of surrendering physical control of property to another party, typically upon the completion of a sale or at the end of a lease term.',
    example:
      'Under the terms of the lease, the tenant was required to yield possession of the apartment by the last day of the month.',
    relatedTerms: ['Possession', 'Eviction', 'Lease'],
  },
  {
    term: 'Zero Tolerance Policy',
    category: 'Criminal Law',
    definition:
      'A strict enforcement policy that imposes automatic punishments for infractions without considering individual circumstances or extenuating factors.',
    example:
      'The school district\'s zero tolerance policy mandated automatic expulsion for any student found with a weapon on school grounds.',
    relatedTerms: ['Policy', 'Punishment', 'Mandatory Sentencing'],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing terms
    await Term.deleteMany({});
    console.log('🗑️  Cleared existing terms');

    // Pre-compute letter and slug (insertMany bypasses pre-save hooks)
    const slugCount = {};
    const termsWithMeta = legalTerms.map((t) => {
      const letter = t.term.charAt(0).toUpperCase();
      let slug = t.term
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      // Handle duplicate slugs
      if (slugCount[slug]) {
        slugCount[slug]++;
        slug = `${slug}-${slugCount[slug]}`;
      } else {
        slugCount[slug] = 1;
      }
      return { ...t, letter, slug };
    });

    const inserted = await Term.insertMany(termsWithMeta);
    console.log(`✅ Seeded ${inserted.length} legal terms successfully`);

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
