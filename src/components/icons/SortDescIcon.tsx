function SortDescIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25.75L17.25 18m0 0L21 14.25M17.25 18V6"
      />
    </svg>
  );
}

export default SortDescIcon;
